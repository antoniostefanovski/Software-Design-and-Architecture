import { ChangeEvent, MouseEventHandler, ReactNode, useState } from 'react';
import searchIcon from '../../assets/icons8-search-120.png';
import locationIcon from '../../assets/Union.png';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Theme, useTheme } from '@mui/material';
import './SearchBar.scss';

type Props = {
    locations: string[],
    placeholder: string | undefined,
    hasFilter: boolean | undefined,
    hasButton: boolean | undefined,
    filterVal: string[],
    filterCallback: ((event: SelectChangeEvent<string[]>) => void) | undefined,
    submitCallback: MouseEventHandler<HTMLButtonElement> | undefined,
    inputCallback: Function | undefined,
    classList: string
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(location: string, filterVal: string[], theme: Theme) {
    return {
      fontWeight:
        filterVal.indexOf(location) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
          fontSize: 13
    };
}

function SearchBar({
    locations,
    placeholder,
    hasFilter,
    hasButton,
    filterVal,
    filterCallback,
    submitCallback,
    inputCallback,
    classList = ""
} : Props) {
    const [text, setText] = useState("");
    const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
    const theme = useTheme();
    
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let change = Boolean(e.target?.value) ? e.target?.value : "";
        setText(change);
        
        if (Boolean(inputCallback) && inputCallback != null) {
            inputCallback(change);
        }
    }

    const onSelectChange = (e: SelectChangeEvent<string[]>) => {
        if (Boolean(filterCallback) && filterCallback != null) {
            filterCallback(e);
        }

        setPlaceholderVisible(e.target.value.length == 0);
    }

    return (
        <div className={['search-bar', classList].join(" ")}>
            <div className="search-bar-textbox">
                <img className='search-bar-textbox-icon' src={searchIcon} alt='icon' />
                <input maxLength={50} className='search-bar-textbox-input' onChange={onInputChange} type='text' value={text} placeholder={placeholder} />
            </div>
            <div className='search-bar-optionals-container'>
                { hasFilter && <div className='search-bar-filter'>
                    <div className='search-bar-filter-separator'></div>
                    <div className='search-bar-filter-input'>
                        <img src={locationIcon} alt='location' className='search-bar-filter-input-icon' />
                        <FormControl id="search-form-control" variant='standard' sx={{ m: 1, width: 300 }}>
                            { isPlaceholderVisible && <span className='search-form-control-placeholder'>Локација</span> }
                            <Select
                                id="search-multiple-locations"
                                multiple
                                value={filterVal}
                                onChange={onSelectChange}
                                sx={{fontSize:'small'}}
                                disableUnderline={true}
                                >
                                {locations.map((location) => (
                                    <MenuItem
                                        key={location}
                                        value={location}
                                        style={getStyles(location, filterVal, theme)}
                                        
                                        >
                                        {location}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                }
                { hasButton && <div className='search-bar-filter-submit'>
                    <button className='search-bar-filter-submit-btn' onClick={submitCallback}>Пребарајте</button>
                </div> }
            </div>
        </div>
    )
}

export default SearchBar