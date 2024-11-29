import mystyles from './Appbar.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm
    const navigate = useNavigate(); // Hook để chuyển hướng
    console.log("re-render search")
    // Hàm xử lý sự kiện khi nhấn nút tìm kiếm
    const handleSearch = () => {
        if (searchQuery) {
            // Nếu có từ khóa tìm kiếm, chuyển hướng đến trang ProductSearch với query string
            navigate(`/product-search?query=${searchQuery}`);
        }
    };
    return (
        <div className={mystyles.searchContainer}>
            <input
                placeholder='Tìm kiếm...'
                className={mystyles.searchInput}
                type='text'
                value={searchQuery} // Lấy giá trị từ state
                onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật state khi người dùng nhập
            />
            <button className={mystyles.searchButton} onClick={handleSearch}> {/* Gọi hàm handleSearch */}
                <SearchIcon />
            </button>
        </div>
    )
}

export default Search;