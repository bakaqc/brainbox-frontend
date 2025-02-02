/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
'use client';

import { ZodError, z } from 'zod';

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

const passwordSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required.'),
		newPassword: z
			.string()
			.min(6, 'New password must be at least 6 characters long.'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'Passwords do not match.',
		path: ['confirmPassword'],
	});

export default function PasswordChangeForm() {
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		try {
			passwordSchema.parse({ currentPassword, newPassword, confirmPassword });
			console.log('Form submitted successfully:', {
				currentPassword,
				newPassword,
				confirmPassword,
			});
		} catch (err) {
			if (err instanceof ZodError) {
				alert(err.errors[0].message);
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
			{/* Current Password */}
			<div>
				<label className="block text-sm mb-2 font-semibold">
					Current Password
				</label>
				<div className="relative">
					<input
						name="currentPassword"
						type="password"
						placeholder="Enter your current password"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			{/* New Password */}
			<div>
				<label className="block text-sm mb-2 font-semibold">New Password</label>
				<div className="relative">
					<input
						name="newPassword"
						type="password"
						placeholder="Enter your new password"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			{/* Confirm Password */}
			<div>
				<label className="block text-sm mb-2 font-semibold">
					Confirm Password
				</label>
				<div className="relative">
					<input
						name="confirmPassword"
						type="password"
						placeholder="Confirm your new password"
						className="w-full p-3 border border-gray-200 rounded-lg"
						required
					/>
				</div>
			</div>

			{/* Submit Button */}
			<button
				type="submit"
				className="bg-[#FF6636] text-white px-6 py-2 rounded-lg hover:bg-[#CC522B] transition-colors"
			>
				Save Password
			</button>
		</form>
	);
}
