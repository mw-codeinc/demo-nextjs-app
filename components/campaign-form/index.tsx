"use client";

export const CampaignForm = () => {
	return (
		<form>
			<div className="space-y-12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base/7 font-semibold text-gray-900">Create new campaign</h2>
					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label htmlFor="campaign-site" className="block text-sm/6 font-medium text-gray-900">
								Site
							</label>
							<div className="mt-2">
								<select
									id="campaign-site"
									name="campaign-site"
									autoComplete="campaign-site"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label
								htmlFor="campaign-property-id"
								className="block text-sm/6 font-medium text-gray-900"
							>
								Property ID
							</label>
							<div className="mt-2">
								<select
									id="campaign-property-id"
									name="campaign-property-id"
									autoComplete="campaign-property-id"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6"
								>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
								Campaign name
							</label>
							<div className="mt-2">
								<input
									id="first-name"
									name="first-name"
									type="text"
									autoComplete="given-name"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						<div className="sm:col-span-3">
							<label htmlFor="campaign-url" className="block text-sm/6 font-medium text-gray-900">
								Campaign url
							</label>
							<div className="mt-2">
								<input
									id="campaign-url"
									name="campaign-url"
									type="text"
									autoComplete="campaign-url"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
						<div className="col-span-full">
							<label htmlFor="ahrefs-id" className="block text-sm/6 font-medium text-gray-900">
								Ahrefs campaign id
							</label>
							<div className="mt-2">
								<input
									id="ahrefs-id"
									name="ahrefs-id"
									type="text"
									autoComplete="ahrefs-id"
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button type="button" className="text-sm/6 font-semibold text-gray-900">
					Cancel
				</button>
				<button
					type="submit"
					className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Save
				</button>
			</div>
		</form>
	);
};
