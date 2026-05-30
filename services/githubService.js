const axios = require("axios");

const getGithubProfileData = async (username) => {
  try {
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );

    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    const user = userResponse.data;
    const repos = reposResponse.data;

    const totalStars = repos.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0
    );

    const totalForks = repos.reduce(
      (sum, repo) => sum + repo.forks_count,
      0
    );

    let mostStarredRepo = null;
    let maxStars = -1;

    repos.forEach((repo) => {
      if (repo.stargazers_count > maxStars) {
        maxStars = repo.stargazers_count;
        mostStarredRepo = repo.name;
      }
    });

    return {
      github_id: user.id,
      username: user.login,
      name: user.name,
      bio: user.bio,
      avatar_url: user.avatar_url,
      profile_url: user.html_url,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      total_stars: totalStars,
      total_forks: totalForks,
      most_starred_repo: mostStarredRepo,
      account_created_at: user.created_at,
    };
  } catch (error) {
    throw new Error("GitHub user not found");
  }
};

module.exports = {
  getGithubProfileData,
};