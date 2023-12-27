import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = ( { 
    searchText,
    changeSearchContactHandler,
    searchForContact
}) => {
    return (
        <div className="input-group mb-4 no-focus-outline">
            <input
                type="text"
                className="form-control"
                placeholder="Search Contact"
                aria-label="Search Contact"
                value={searchText}
                onChange={changeSearchContactHandler}
            />
            <button className="btn custom-btn" onClick={searchForContact}>
                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}
