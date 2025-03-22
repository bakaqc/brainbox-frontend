import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useChatSocket } from '@/hooks/useChatSocket';

interface TeacherCardProps {
	avatarUrl: string;
	name: string;
	major: string;
	rating: number;
	students: number;
	teacherId: number;
}

const TeacherCard: React.FC<TeacherCardProps> = ({
	avatarUrl,
	name,
	major,
	rating,
	students,
	teacherId,
}) => {
	const { user } = useUser();
	const { createConversation } = useChatSocket();
	console.log('TeacherCard:', teacherId);

	const handleSendMessage = async () => {
		if (user) {
			await createConversation(Number(user.id), teacherId);
			window.location.href = '/message';
		}
	};

	return (
		<Card className="flex flex-col justify-center bg-white max-w-[244px] transition-transform transform hover:scale-105 cursor-pointer group hover:shadow-2xl">
			<Image
				loading="lazy"
				src={avatarUrl}
				className="object-cover w-full shadow-sm aspect-square rounded-t-lg"
				alt={`Profile picture of ${name}`}
				width={244}
				height={244}
			/>
			<CardContent className="flex flex-col justify-center mt-1 w-full p-3">
				<CardTitle className="text-base font-medium leading-none text-neutral-800 group-hover:text-orange-500 line-clamp-1 text-center">
					{name}
				</CardTitle>
				<p className="mt-1 text-sm tracking-normal leading-loose text-gray-400 text-center">
					{major}
				</p>
			</CardContent>
			<Separator />
			<CardContent className="flex gap-10 justify-between px-3.5 w-full text-sm tracking-normal p-3">
				<div className="flex gap-1 items-center self-stretch my-auto font-medium leading-none text-gray-600 whitespace-nowrap">
					<FaStar
						className="flex shrink-0 self-stretch my-auto w-4 h-4 text-yellow-400"
						aria-hidden="true"
					/>
					<span aria-label="Instructor rating">{rating}</span>
				</div>
				<div className="flex justify-center self-stretch my-auto">
					<div className="self-stretch my-auto leading-none text-gray-600 font-medium">
						{students}
					</div>
					<div className="self-stretch my-auto leading-loose text-gray-400 ml-1">
						students
					</div>
				</div>
			</CardContent>
			{user && (
				<CardContent className="px-3.5 pb-3">
					<Button
						className="w-full bg-[#ffeee8] text-[#ff6636] font-bold hover:bg-[#ffccbb]"
						onClick={handleSendMessage}
					>
						Send Message
					</Button>
				</CardContent>
			)}
		</Card>
	);
};

export default TeacherCard;
