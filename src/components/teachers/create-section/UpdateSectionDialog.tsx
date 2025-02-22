'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { PiPencilSimpleLineBold } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Section, SectionData, sectionSchema } from '@/schemas/section.schema';
import { updateSection } from '@/services/api/section';

interface UpdateSectionDialogProps {
	courseId: string;
	sectionId: string;
	initialTitle: string;
	onSectionUpdated: (updatedSection: Section) => void;
}

const UpdateSectionDialog: React.FC<UpdateSectionDialogProps> = ({
	courseId,
	sectionId,
	initialTitle,
	onSectionUpdated,
}) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SectionData>({
		resolver: zodResolver(sectionSchema),
		defaultValues: { title: initialTitle },
	});

	const onSubmit = async (data: SectionData) => {
		try {
			const updatedSection = await updateSection(courseId, sectionId, data);
			toast({
				title: 'Success',
				description: 'Section updated successfully!',
				variant: 'success',
			});
			onSectionUpdated(updatedSection);
			setIsOpen(false); // Close the dialog
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update section.',
				variant: 'destructive',
			});
			console.error('Failed to update section:', error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<PiPencilSimpleLineBold className="w-6 h-6 text-[#8C94A3]" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Section Name</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex flex-col space-y-1">
						<label
							htmlFor="sectionName"
							className="text-sm font-medium text-[#1d1f26]"
						>
							Section
						</label>
						<input
							id="title"
							{...register('title')}
							className="w-full pl-4 pr-4 pt-3 pb-3 bg-white border border-[#e8eaef] text-base font-normal text-[#8c93a3]"
							placeholder="Write your section name here.."
						/>
						{errors.title && (
							<p className="text-red-500 text-sm">{errors.title.message}</p>
						)}
					</div>
					<div className="flex justify-between">
						<DialogClose asChild>
							<Button
								type="button"
								variant="outline"
								className="bg-[#f4f7f9] text-[#1d1f26]"
							>
								Cancel
							</Button>
						</DialogClose>
						<Button type="submit" className="bg-[#ff6636] text-white">
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateSectionDialog;
