'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { getCourse } from '@/services/api/course';

interface VideoSectionProps {
	readonly courseId: string;
}

export default function VideoSection({ courseId }: VideoSectionProps) {
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchThumbnail = async () => {
			try {
				setLoading(true);
				const course = await getCourse(+courseId);
				// Handle empty string by converting to null
				const thumbnailUrl =
					course.thumbnail && course.thumbnail.trim() !== ''
						? course.thumbnail
						: null;
				setThumbnail(thumbnailUrl);
			} catch (err) {
				console.error(
					`Failed to fetch course thumbnail for ID ${courseId}:`,
					err,
				);
				setError('Failed to load course thumbnail. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchThumbnail();
	}, [courseId]);

	if (loading) {
		return (
			<section className="flex flex-col justify-center items-center px-16 py-38 max-w-[872px] max-md:px-5 max-md:py-24">
				<div className="relative w-full max-w-3xl aspect-video flex items-center justify-center">
					<p className="text-gray-500">Loading...</p>
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="flex flex-col justify-center items-center px-16 py-38 max-w-[872px] max-md:px-5 max-md:py-24">
				<div className="relative w-full max-w-3xl aspect-video flex items-center justify-center">
					<p className="text-red-500">{error}</p>
				</div>
			</section>
		);
	}

	// Only render Image if thumbnail is a valid string
	return (
		<section className="flex flex-col justify-center items-center px-16 py-38 max-w-[872px] max-md:px-5 max-md:py-24">
			<div className="relative w-full max-w-3xl aspect-video">
				{thumbnail ? (
					<Image
						className="w-full h-full rounded-lg shadow-lg object-cover"
						src={thumbnail}
						alt="Course Thumbnail"
						width={872}
						height={490}
					/>
				) : (
					<Image
						className="w-full h-full rounded-lg shadow-lg object-cover"
						src="https://via.placeholder.com/872x490"
						alt="Course Thumbnail Placeholder"
						width={872}
						height={490}
					/>
				)}
			</div>
		</section>
	);
}
