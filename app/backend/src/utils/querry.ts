const listHomeTeamQuery = `SELECT
teams.team_name AS name,
SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3
         WHEN matches.home_team_goals = matches.away_team_goals THEN 1
         ELSE 0 END) AS totalPoints,
COUNT(matches.id) AS totalGames,
SUM(CASE WHEN matches.home_team_goals >
  matches.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(home_team_goals) AS goalsFavor,
SUM(away_team_goals) AS goalsOwn,
(SUM(home_team_goals) - SUM(away_team_goals)) AS goalsBalance,
FORMAT(((SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3
                WHEN matches.home_team_goals = matches.away_team_goals THEN 1
                ELSE 0 END) / (COUNT(matches.id) * 3)) * 100), 2) AS efficiency
FROM
matches
LEFT JOIN teams ON teams.id = matches.home_team_id
WHERE
in_progress = false
GROUP BY
name
ORDER BY
totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

const listAwayTeamQuery = `SELECT
teams.team_name AS name,
SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 3
         WHEN matches.home_team_goals = matches.away_team_goals THEN 1
         ELSE 0 END) AS totalPoints,
COUNT(matches.id) AS totalGames,
SUM(CASE WHEN matches.home_team_goals <
  matches.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(away_team_goals) AS goalsFavor,
SUM(home_team_goals) AS goalsOwn,
(SUM(away_team_goals) - SUM(home_team_goals)) AS goalsBalance,
FORMAT(((SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 3
                WHEN matches.home_team_goals = matches.away_team_goals THEN 1
                ELSE 0 END) / (COUNT(matches.id) * 3)) * 100), 2) AS efficiency
FROM
matches
LEFT JOIN teams ON teams.id = matches.away_team_id
WHERE
in_progress = false
GROUP BY
name
ORDER BY
totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;
`;

const listTeamQuery = `
SELECT
  name,
  SUM(totalPoints) AS totalPoints,
  COUNT(totalGames) AS totalGames,
  SUM(totalVictories) AS totalVictories,
  SUM(totalDraws) AS totalDraws,
  SUM(totalLosses) AS totalLosses,
  SUM(goalsFavor) AS goalsFavor,
  SUM(goalsOwn) AS goalsOwn,
  SUM(goalsFavor - goalsOwn) AS goalsBalance,
  FORMAT(((SUM(totalPoints) / (COUNT(totalGames) * 3)) * 100), 2) AS efficiency
FROM (
  -- Subquery para home team stats
  SELECT
    teams.team_name AS name,
    (CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 3
          WHEN matches.home_team_goals = matches.away_team_goals THEN 1
          ELSE 0 END) AS totalPoints,
    COUNT(matches.id) AS totalGames,
    (CASE WHEN matches.home_team_goals >
      matches.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
    (CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
    (CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
    SUM(home_team_goals) AS goalsFavor,
    SUM(away_team_goals) AS goalsOwn
  FROM
    matches
    LEFT JOIN teams ON teams.id = matches.home_team_id
  WHERE
    in_progress = false

  UNION ALL

  -- Subquery para away team stats
  SELECT
    teams.team_name AS name,
    (CASE WHEN matches.home_team_goals < matches.away_team_goals THEN 3
          WHEN matches.home_team_goals = matches.away_team_goals THEN 1
          ELSE 0 END) AS totalPoints,
    COUNT(matches.id) AS totalGames,
    (CASE WHEN matches.home_team_goals <
      matches.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
    (CASE WHEN matches.home_team_goals = matches.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
    (CASE WHEN matches.home_team_goals > matches.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
    SUM(away_team_goals) AS goalsFavor,
    SUM(home_team_goals) AS goalsOwn
  FROM
    matches
    LEFT JOIN teams ON teams.id = matches.away_team_id
  WHERE
    in_progress = false
) AS finalStats
GROUP BY
  name
ORDER BY
  totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC;

`;

export {
  listHomeTeamQuery,
  listAwayTeamQuery,
  listTeamQuery,
};
