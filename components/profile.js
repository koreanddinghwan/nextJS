import { getGitUser } from '../pages/api/githandler'
import utilStyles from '../styles/utils.module.css'

export default function Profile({ user }) {
	return (
		<Profile>
			<section>
				<h3 className={utilStyles.borderCircle}>
					{user}
				</h3>
			</section>
		</Profile>
	)
}

export async function getStaticProps() {
	const user = await getGitUser();
	return {
		props : {
			user
		}
	}
}