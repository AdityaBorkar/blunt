import { LinkAccordion } from '../../components/link-accordion';

export default function SearchParamsPage() {
	return (
		<>
			<p>
				Demonstrates that we can prefetch a page that reads from search params
			</p>
			<ul>
				<li>
					<LinkAccordion href="/search-params/target-page?searchParam=a_PPR">
						searchParam=a_PPR
					</LinkAccordion>
				</li>
				<li>
					<LinkAccordion
						href="/search-params/target-page?searchParam=b_full"
						prefetch={true}
					>
						searchParam=b_full, prefetch=true
					</LinkAccordion>
				</li>
				<li>
					<LinkAccordion href="/search-params/target-page?searchParam=c_PPR">
						searchParam=c_PPR
					</LinkAccordion>
				</li>
				<li>
					<LinkAccordion
						href="/search-params/target-page?searchParam=d_full"
						prefetch={true}
					>
						searchParam=d_full, prefetch=true
					</LinkAccordion>
				</li>
			</ul>
		</>
	);
}
