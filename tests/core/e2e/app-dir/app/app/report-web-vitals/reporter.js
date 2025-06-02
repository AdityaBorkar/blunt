'use client';

import { useReportWebVitals } from 'next/web-vitals';

const report = (metric) => {
	const blob = new Blob([new URLSearchParams(metric).toString()]);
	const vitalsUrl = 'https://example.vercel.sh/vitals';
	fetch(vitalsUrl, {
		body: blob,
		credentials: 'omit',
		keepalive: true,
		method: 'POST',
	});
};

export default function Reporter() {
	useReportWebVitals(report);
}
