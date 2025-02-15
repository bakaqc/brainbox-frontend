import React from 'react';
import { FiSearch } from 'react-icons/fi';

import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface SearchAndFilterProps {
	totalCourses: number;
	onSearch: (query: string) => void;
	onStatusChange: (status: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
	totalCourses,
	onSearch,
	onStatusChange,
}) => {
	return (
		<div className="h-32 flex flex-col justify-start items-start gap-6 w-full">
			<div>
				<span className="text-[#1d1f26] text-2xl font-semibold leading-loose">
					Courses{' '}
				</span>
				<span className="text-[#1d1f26] text-2xl font-normal leading-loose">
					({totalCourses})
				</span>
			</div>
			<div className="flex justify-between items-end gap-6 w-full">
				<div className="w-[500px] flex flex-col justify-start items-start gap-2">
					<div className="text-[#6e7484] text-xs font-normal leading-none">
						Search:
					</div>
					<div className="relative w-full">
						<FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<Input
							type="text"
							placeholder="Search in your courses..."
							className="h-12 pl-12 pr-72 py-3 bg-white border border-[#e8eaef] justify-start items-center inline-flex overflow-hidden"
							onChange={(e) => onSearch(e.target.value)}
						/>
					</div>
				</div>
				<div className="w-60 flex flex-col justify-start items-start gap-2">
					<div className="text-[#6e7484] text-xs font-normal leading-none">
						Status:
					</div>
					<Select onValueChange={onStatusChange}>
						<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] justify-center items-center gap-[104px] inline-flex overflow-hidden">
							<SelectValue placeholder="All Courses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Courses</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
							<SelectItem value="in-progress">In Progress</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	);
};

export default SearchAndFilter;
