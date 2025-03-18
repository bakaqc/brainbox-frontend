'use client';

import { useEffect, useState } from 'react';
import { LuRefreshCw } from 'react-icons/lu';

import Loading from '@/components/commons/Loading';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/contexts/UserContext';
import type { WithdrawHistory } from '@/schemas/withdraw.schema';
import { getWithdrawHistory } from '@/services/custom/withdraw/getWithdrawHistory';
import { formatCurrency } from '@/utils/currency';
import { formatDateWithdraw } from '@/utils/date';

const WithdrawHistory = () => {
	const { user, loading: userLoading } = useUserContext();
	const [withdrawals, setWithdrawals] = useState<WithdrawHistory[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchWithdrawHistory = async () => {
			if (!user?.id || userLoading) return;

			setLoading(true);
			setError(null);
			try {
				const data = await getWithdrawHistory(user.id);
				setWithdrawals(data);
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'Failed to fetch withdraw history';
				setError(errorMessage);
				console.error('Error fetching withdraw history:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchWithdrawHistory();
	}, [user, userLoading]);

	const handleRefresh = async () => {
		if (!user?.id || userLoading) return;

		setLoading(true);
		setError(null);
		try {
			const data = await getWithdrawHistory(user.id);
			setWithdrawals(data);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to fetch withdraw history';
			setError(errorMessage);
			console.error('Error fetching withdraw history:', error);
		} finally {
			setLoading(false);
		}
	};

	const getStatusColor = (status: string) => {
		switch (status.toLowerCase()) {
			case 'pending':
				return 'text-amber-500';
			case 'approved':
				return 'text-green-600';
			case 'rejected':
				return 'text-red-500';
			default:
				return '';
		}
	};

	if (userLoading) {
		return <Loading content="Loading user data" />;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<section className="px-3 bg-white max-w-[784px]">
			<header className="flex flex-wrap gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
				<h2 className="self-stretch my-auto text-base font-medium leading-none text-neutral-800">
					Withdraw History
				</h2>
				<Button
					variant="outline"
					size="sm"
					onClick={handleRefresh}
					disabled={loading}
					className="flex items-center gap-2"
				>
					<LuRefreshCw className="h-4 w-4" />
					{loading ? 'Refreshing...' : 'Refresh'}
				</Button>
			</header>

			<div className="flex flex-wrap gap-3 justify-center items-center px-5 py-2.5 text-xs font-medium leading-tight text-gray-500 uppercase whitespace-nowrap bg-slate-100">
				<div className="self-stretch my-auto w-[200px]">Date</div>
				<div className="self-stretch my-auto w-[200px]">Amount</div>
				<div className="self-stretch my-auto w-[124px]">Status</div>
			</div>

			{loading ? (
				<div className="flex justify-center items-center py-4">
					<Loading content="Loading withdraw history" />
				</div>
			) : withdrawals.length === 0 ? (
				<div className="text-center py-4 text-gray-500">
					No withdraw history available.
				</div>
			) : (
				withdrawals.map((withdrawal) => (
					<div
						key={withdrawal.id}
						className="flex flex-wrap gap-3 justify-center items-center px-5 py-3 text-sm tracking-normal leading-loose text-gray-600"
					>
						<div className="self-stretch my-auto w-[200px]">
							{formatDateWithdraw(withdrawal.createAt)}
						</div>
						<div className="self-stretch my-auto w-[200px]">
							{formatCurrency(withdrawal.amount)}
						</div>
						<div
							className={`self-stretch my-auto font-medium leading-none w-[88px] ${getStatusColor(
								withdrawal.status || '',
							)}`}
						>
							{withdrawal.status}
						</div>
						<button
							className="flex shrink-0 self-stretch my-auto w-6 h-6"
							aria-label="More options"
						></button>
					</div>
				))
			)}
		</section>
	);
};

export default WithdrawHistory;
