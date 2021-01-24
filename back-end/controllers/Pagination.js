const Pagination = (url ,page ,rows_number ,limit) => {
    const pages_count = Math.ceil(rows_number / limit)
    const pages = []
    pages.push({
        link: `${url}?page=1&limit=${limit}`,
        name: '1',
        is_active: page == 1
    })
    if (pages_count <= 1) return pages
    if (page - 2 > 2) {
        pages.push({
            link: '#',
            name: '...',
            disable: true
        })
    }
    let start = page - 2 ,end = page + 2
    start = start < 2 ? 2 : start
    end = end >= pages_count ? pages_count - 1 : end
    for(let i = start; i <= end; i++) {
        pages.push({
            link: `${url}?page=${i}&limit=${limit}`,
            name: i,
            is_active: page == i ? true : false
        })
    }
    if (page + 2 < pages_count) {
        pages.push({
            link: '#',
            name: '...',
            disable: true
        })
    }
    pages.push({
        link: `${url}?page=${pages_count}&limit=${limit}`,
        name: pages_count,
        is_active: page == pages_count
    })
    return pages
}

export default Pagination