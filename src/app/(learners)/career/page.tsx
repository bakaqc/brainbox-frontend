import Content from '@/components/learners/career/Content';
import Header from '@/components/learners/career/Header';
import JobList from '@/components/learners/career/JobList';
import Logo from '@/components/learners/career/Logo';

export default function Home() {
	return (
		<div>
			<Header />
			<Content />
			<Logo />
			<JobList />
		</div>
	);
}
