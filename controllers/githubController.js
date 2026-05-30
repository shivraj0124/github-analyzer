const pool = require("../config/db");
const { getGithubProfileData } = require("../services/githubService");

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const profile = await getGithubProfileData(username);
    console.log(profile)
    profile.account_created_at = new Date(profile.account_created_at);
    await pool.query(
      `
      INSERT INTO github_profiles (
        github_id,
        username,
        name,
        bio,
        public_repos,
        followers,
        following,
        total_stars,
        total_forks,
        profile_url,
        avatar_url,
        account_created_at,
        most_starred_repo
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        bio = VALUES(bio),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        total_stars = VALUES(total_stars),
        total_forks = VALUES(total_forks),
        most_starred_repo = VALUES(most_starred_repo)
      `,
      [
        profile.github_id,
        profile.username,
        profile.name,
        profile.bio,
        profile.public_repos,
        profile.followers,
        profile.following,
        profile.total_stars,
        profile.total_forks,
        profile.profile_url,
        profile.avatar_url,
        profile.account_created_at,
        profile.most_starred_repo,
      ]
    );

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const [profiles] = await pool.query(
      "SELECT * FROM github_profiles ORDER BY analyzed_at DESC"
    );

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const [profile] = await pool.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username]
    );

    if (profile.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile,
};