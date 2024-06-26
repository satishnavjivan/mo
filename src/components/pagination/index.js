import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { createPaginationLinks } from '../../utils/pagination';
import cx from 'classnames';
import Previous from './previous';
import Next from './next';

const Pagination = ({ pagesCount, postName }) => {
	if (!pagesCount || !postName) {
		return null;
	}

	const router = useRouter();
	const currentPageNo = parseInt(router?.query?.pageNo ?? 1) || 1;

	const paginationLinks = createPaginationLinks(currentPageNo, pagesCount);

	return (
		<div className="flex justify-center my-8 gap-2">

			<Previous currentPageNo={currentPageNo} postName={postName} />

			{paginationLinks.map((pageNo, index) => {
				const paginationLink = `/${postName}/page/${pageNo}/`;
				return (
					'number' === typeof pageNo ? (
						<Link key={`id-${index}`} href={paginationLink} legacyBehavior>
							<a
								className={`inline-flex size-9 items-center justify-center border border-slate-200 text-gray-900 hover:bg-victoria-800 hover:text-white hover:border-victoria-800 ${pageNo === currentPageNo ? 'bg-victoria-800 text-white' : ''}`}
							>
								{pageNo}
							</a>
						</Link>
					) : (
						// If its "..."
						<span key={`id-${index}`} className="px-3 py-2">{pageNo}</span>
					)
				);
			})}
			<Next currentPageNo={currentPageNo} pagesCount={pagesCount} postName={postName} />
		</div>
	);
};

Pagination.propTypes = {
	pagesCount: PropTypes.number,
	postName: PropTypes.string,
};

Pagination.defaultProps = {
	pagesCount: 0,
	postName: 'blog',
};

export default Pagination;
