import propTypes from 'prop-types'

const Pagination = ({currentPage, numberOfPages, limit, pageSet}) => {

    const currentSet =  Math.ceil(currentPage/limit);//현재 페이지 단위 위치
    const startPage = limit * (currentSet - 1) + 1;//커런트셋 시작 페이지 숫자
    const lastSet = Math.ceil(numberOfPages/limit);//마지막 커런트셋 숫자
    const numberOfPageForSet = currentSet === lastSet ? numberOfPages % limit || limit : limit; // 커런트 마다 보여질 페이지 숫자


    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">

                <li className={`page-item ${currentSet === 1 ? 'disabled' : ''}`}>
                    <div className="page-link cursor-pointer" onClick={() => pageSet(startPage-limit)} >Previous</div>
                </li>

                {Array(numberOfPageForSet).fill(startPage).map((value, index) => value + index)
                    .map((pageNumber)=>
                        <li className={`page-item ${currentPage === pageNumber ? 'active' : ''}`}>
                            <div 
                                className="page-link cursor-pointer"
                                onClick={() => pageSet(pageNumber)}
                            >
                                {pageNumber}
                            </div>
                        </li>
                    )
                }

                <li className={`page-item ${currentSet === lastSet ? 'disabled' : ''}`}>
                    <div className="page-link cursor-pointer" onClick={() => pageSet(startPage+limit)}>Next</div>
                </li>
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    currentPage : propTypes.number,
    numberOfPages : propTypes.number.isRequired,
    onClick: propTypes.func.isRequired,
    limit: propTypes.number
}

Pagination.defaultProps = {
    currentPage : 1,
    limit : 5
}


export default Pagination;