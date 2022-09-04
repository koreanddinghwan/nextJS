import fetch from 'isomorphic-unfetch'
import { Octokit } from '@octokit/rest';

export default async function getGitUser(req, res) {

	try {
		const octokit = new Octokit({
			auth : process.env.GITHUB_AUTH_TOKEN
		})
		const followers = await octokit.request("/users/koreanddinghwan/followers?per_page=100");
		console.log(followers)

		const followerCnt = followers.data.length;
		const stars = await octokit.request("/users/koreanddinghwan/repos")
		console.log(stars)
		// const startsCnt = stars.data.filter()
		return (res.status(200).json({ followers, followerCnt, stars }))
	} catch (e) {
		console.log(e)
		return (res.status(400).json({}))
	}
}