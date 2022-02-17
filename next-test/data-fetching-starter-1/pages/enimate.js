import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export default function Home({ allPostsData }) {
  return (
    <ul >
      {allPostsData.map(({ id, date, title }) => (
        <li key={id}>  {title} <br /> {id}  <br /> {date} </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const markdownDir = path.join(process.cwd(), 'posts');
  const fileNames = fs.readdirSync(markdownDir);
  const allPostsData = fileNames.map(fileName => {
    const fullPath = path.join(markdownDir, fileName);
    const id = fileName.replace(/\.md$/g, '');
    const text = fs.readFileSync(fullPath, 'utf-8');
    const { data: { title, date }, content } = matter(text);
    return {
      id, title, date
    };
  });
  return {
    props: {
      allPostsData
    }
  }
}



