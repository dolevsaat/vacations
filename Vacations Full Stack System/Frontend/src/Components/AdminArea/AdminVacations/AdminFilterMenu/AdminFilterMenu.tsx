import "./AdminFilterMenu.css";
import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// Models
import FilterMenuDataModel from "../../../../Models/FilterMenuDataModel";

interface filterMenuInterface {
    onDataSend: (data: FilterMenuDataModel) => void;
}

function AdminFilterMenu(props: filterMenuInterface): JSX.Element {
    // Filter data to send to parent
    const { onDataSend } = props;

    // Initial render state
    const [initialRender, setInitialRender] = useState<boolean>(true);

    // Show only vacation that not started if true
    const [isNotStarted, setIsNotStarted] = useState<boolean>(false);

    // Show only active vacation if true
    const [isActive, setIsActive] = useState<boolean>(false);

    // Handle isNotStarted toggle
    function toggleIsNotStarted() {
        setIsNotStarted(!isNotStarted);
    }

    // Handle isActive toggle
    function toggleIsActive() {
        setIsActive(!isActive);
    }

    // Clear selection
    function clearSelection() {
        setIsNotStarted(false);
        setIsActive(false);
    }

    // Update onDataSend when relevant state changed
    useEffect(() => {
        if (initialRender) {
            setInitialRender(false);
        } else {
            const data = new FilterMenuDataModel();
            data.isNotStarted = isNotStarted;
            data.isActive = isActive;
            onDataSend(data);
        }
    }, [isNotStarted, isActive]);

    // ============================= HTML =============================
    return (
        <>
            <div className="AdminFilterMenu">
                <h3> Admin menu</h3>
                <h4> Filter vacations</h4>

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
                <span> ============== </span>

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

                <span> ============== </span>

                <button className="clear-selection" onClick={clearSelection}>
                    {" "}
                    Clear selection
                </button>

                <span> ============== </span>

                <NavLink to={"/add-vacation"}>
                    <button className="add-vacation"> Add new vacation</button>
                </NavLink>

                <span> ============== </span>

                <NavLink to={"/admin-reports"}>
                    <button className="reports"> Reports</button>
                </NavLink>
            </div>
        </>
    );
}

export default AdminFilterMenu;
