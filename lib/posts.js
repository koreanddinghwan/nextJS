import fs from 'fs';
import path from 'path'
import matter from 'gray-matter'; //markdown syntax analyzer
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts');

//파일시스템, 외부 API fetch, database query 등을 
//build time에 실행된다.
export function getSortedPostsData() {
	//file system에서 파일 가져와서 객체화
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		//.md파일의 이름을 id로
		const id = fileName.replace(/\.md$/, '');
		
		//파일 경로 얻기
		const fullPath = path.join(postsDirectory, fileName)
		//파일 동기적으로 읽기(함수 끝날때까지 대기)
		const fileContents = fs.readFileSync(fullPath, 'utf8')
		
		//gray-matter로 md파일 파싱
		const matterResult = matter(fileContents);
		//id와 data를 묶어서 리턴
		return {
			id, 
			...matterResult.data
		}
	})

	return allPostsData.sort(({ date : a }, { date : b}) => {
		if (a < b)
			return 1;
		else if (a > b)
			return (-1);
		else
			return 0;	
	})
}

export function getAllPostIds() {

	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params : {
				id : fileName.replace(/\.md$/, ''),
			}
		}
	})
}

/*
	getAllPostIds from external api or database
export async function getAllPostIds() {
	const res = await fetch('..')
	const posts = await res.json();
	return posts.map((post) => {
		return {
			params : {
				id: post.id
			}
		}
	})
}
*/

export async function getPostData(id) {
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, 'utf8');

	//md file metadata section
	const matterResult = matter(fileContents)

	const processedContent = await remark()
	.use(html)
	.process(matterResult.content)
	const contentHtml = processedContent.toString()

	return {
		id,
		...matterResult.data,
		contentHtml
	}
}