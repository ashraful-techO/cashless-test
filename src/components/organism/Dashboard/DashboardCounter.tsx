"use client";

export const DashboardCounter = () => {
	return (
		<div className="grid grid-cols-3 gap-6 bg-default p-6">
			<div className="w-full bg-primary/5 rounded-md p-6 ">
				<p className="text-secondary/95 font-medium text-lg text-center">Total</p>
				<p className="text-5xl text-center font-bold">10</p>
			</div>
			<div className="w-full bg-primary/5 rounded-md p-6 ">
				<p className="text-secondary/95 font-medium text-lg text-center">Pending</p>
				<p className="text-5xl text-center font-bold">10</p>
			</div>
			<div className="w-full bg-primary/5 rounded-md p-6 ">
				<p className="text-secondary/95 font-medium text-lg text-center">Completed</p>
				<p className="text-5xl text-center font-bold">10</p>
			</div>
		</div>
	);
};
