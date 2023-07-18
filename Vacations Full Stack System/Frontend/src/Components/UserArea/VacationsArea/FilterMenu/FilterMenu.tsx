import "./FilterMenu.css";
import { ChangeEvent, useEffect, useState } from "react";
// Models
import FilterMenuDataModel from "../../../../Models/FilterMenuDataModel";

interface filterMenuInterface {
    onDataSend: (data: FilterMenuDataModel) => void;
}

function FilterMenu(props: filterMenuInterface): JSX.Element {
    // Filter data to send to parent
    const { onDataSend } = props;

    // Initial render state
    const [initialRender, setInitialRender] = useState<boolean>(true);

    // Show only followed vacation if true
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    // Show only vacation that not started if true
    const [isNotStarted, setIsNotStarted] = useState<boolean>(false);

    // Show only active vacation if true
    const [isActive, setIsActive] = useState<boolean>(false);

    // Show only vacation that are cheaper than selected price
    const [sortByPrice, setSortByPrice] = useState<number>(10000);


    // Handle isFollowing toggle
    function toggleIsFollowing() {
        setIsFollowing(!isFollowing);
    }

    // Handle isNotStarted toggle
    function toggleIsNotStarted() {
        setIsNotStarted(!isNotStarted);
    }

    // Handle isActive toggle
    function toggleIsActive() {
        setIsActive(!isActive);
    }


    // Handle sort by price
    function handlePriceChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setSortByPrice(parseInt(event.target.value));
    }

    // Clear selection
    function clearSelection() {
        setIsFollowing(false);
        setIsNotStarted(false);
        setIsActive(false);
        setSortByPrice(10000);
    }

    // Update onDataSend when relevant state changed
    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            const data = new FilterMenuDataModel();
            data.isFollowing = isFollowing;
            data.isNotStarted = isNotStarted;
            data.isActive = isActive;
            data.sortByPrice = sortByPrice;
            onDataSend(data);
        }
    }, [isFollowing, isNotStarted, isActive, sortByPrice, initialRender]);

    // ============================= HTML =============================
    return (
        <>
            <div className="FilterMenu">
                <h2> Filters</h2>

                {/* Sort by price */}
                <div className="price-range">
                    <small> Show vacations under:</small>
                    <div>
                        <input
                            type="range"
                            name="range-slider"
                            min="0"
                            max="10000"
                            step="500"
                            value={sortByPrice}
                            onChange={handlePriceChange}
                        />
                    </div>
                    <span className="price-display">${sortByPrice}</span>
                </div>

                {/* Is following */}
                <div className="checkbox-wrapper">
                    <small> Show followed vacations</small>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isFollowing}
                            onChange={toggleIsFollowing}
                        />
                        <div className="slider round"></div>
                    </label>
                </div>

                {/* Is not started */}
                <div className="checkbox-wrapper">
                    <small> Show vacations that not started</small>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isNotStarted}
                            onChange={toggleIsNotStarted}
                        />
                        <div className="slider round"></div>
                    </label>
                </div>

                {/* Is Active */}
                <div className="checkbox-wrapper">
                    <small> Show active vacations</small>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={toggleIsActive}
                        />
                        <div className="slider round"></div>
                    </label>
                </div>

                <button className="clear-btn" onClick={clearSelection}>
                    {" "}
                    Clear selection
                </button>
            </div>
        </>
    );
}

export default FilterMenu;
