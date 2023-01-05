/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';
import { REACT_APP_API_FETCH_EMPLOYEE } from '../redux/apiConstants';

export const TableContext = createContext();

function TableContextProvider(props) {
  const [url, setUrl] = useState(REACT_APP_API_FETCH_EMPLOYEE);
  const [bodyStyle, bodySetStyle] = useState('bodythemelight');
  const [headerbgStyle, headerbgSetStyle] = useState('headerthemelight');
  const [bodyheader, bodyheaderSetStyle] = useState('headinglight');
  const [leftmenuStyle, leftmenuSetStyle] = useState('menuthemelight');
  const [leftmenulinks, leftmenuSetlinks] = useState('menulinklight');
  const [leftmenulinkSelected, leftmenuSetlinkSelected] = useState('menulinklightSelected');
  const [searchboxStyle, searchboxSetStyle] = useState('searchboxlight');
  const [tableheadStyle, tableheadSetStyle] = useState('tableheadlight');
  const [tablebodyStyle, tablebodySetStyle] = useState('tablebodylight');
  const [paginationStyle, paginationSetStyle] = useState('paginationlight');
  const [formthemeStyle, formthemeSetStyle] = useState('formthemelight');
  const [viewformStyle, viewformSetStyle] = useState('viewformlight');
  const [permissionboxStyle, permissionboxSetStyle] = useState('permissionboxlight');
  const [settingsgeneralStyle, settingsgeneralSetStyle] = useState('settingslinks');
  const [settingsapiStyle, settingsapiSetStyle] = useState('settingslinks');
  const [settingsprefStyle, settingsprefSetStyle] = useState('settingslinks');
  const [profiledropdownStyle, profiledropdownSetStyle] = useState('profiledropdownlight');
  const [errormsgStyle, errormsgSetStyle] = useState('errormsgclr');
  const [graphbgStyle, graphbgSetStyle] = useState('graphclrlight');
  const [card1bgStyle, card1bgSetStyle] = useState('card1bglight');
  const [card2bgStyle, card2bgSetStyle] = useState('card2bglight');
  const [card3bgStyle, card3bgSetStyle] = useState('card3bglight');
  const [card4bgStyle, card4bgSetStyle] = useState('card4bglight');
  const [agheaderbgStyle, agheaderbgSetStyle] = useState('agheaderbglight');
  const [actionbtnStyle, actionbtnSetStyle] = useState('actionbtnlight');
  const [toggle, settoggle] = useState(true);
  const [action, setAction] = useState(3);
  const [checkedState, setCheckedState] = useState(new Array(action.length).fill(false));
  const [dateFormat, setDateFormat] = useState('MM-dd-y');
  const [dashboardHeader, setDashboardHeader] = useState('');
  const [deletedData, setDeletedData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [dashboardStyle, dashboardSetStyle] = useState('dashboard');
  const [tableLoading, setTableLoading] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [paginationData, setPaginationData] = useState([
    { page: 0, totalResult: 0, totalPages: 0 },
  ]);
  const [sorting, setSorting] = useState([{ col: 'none', sortType: 'none' }]);
  const [search, setSearchTerm] = useState(null);
  const [selected, setselected] = useState([]);
  const [files, setFiles] = useState([]);
  const value = {
    profiledropdownStyle,
    profiledropdownSetStyle,
    headerbgStyle,
    headerbgSetStyle,
    toggle,
    settoggle,
    actionbtnStyle,
    actionbtnSetStyle,
    agheaderbgStyle,
    agheaderbgSetStyle,
    card1bgStyle,
    card1bgSetStyle,
    card2bgStyle,
    card2bgSetStyle,
    card3bgStyle,
    card3bgSetStyle,
    card4bgStyle,
    card4bgSetStyle,
    graphbgStyle,
    graphbgSetStyle,
    permissionboxStyle,
    permissionboxSetStyle,
    leftmenulinkSelected,
    leftmenuSetlinkSelected,
    errormsgStyle,
    errormsgSetStyle,
    url,
    setUrl,
    settingsprefStyle,
    settingsprefSetStyle,
    settingsapiStyle,
    settingsapiSetStyle,
    settingsgeneralStyle,
    settingsgeneralSetStyle,
    viewformStyle,
    viewformSetStyle,
    formthemeStyle,
    formthemeSetStyle,
    paginationStyle,
    paginationSetStyle,
    tableheadStyle,
    tableheadSetStyle,
    tablebodyStyle,
    tablebodySetStyle,
    searchboxStyle,
    searchboxSetStyle,
    leftmenulinks,
    leftmenuSetlinks,
    leftmenuStyle,
    leftmenuSetStyle,
    bodyheader,
    bodyheaderSetStyle,
    bodyStyle,
    bodySetStyle,
    action,
    setAction,
    checkedState,
    setCheckedState,
    deletedData,
    setDeletedData,
    dashboardHeader,
    setDashboardHeader,
    dateFormat,
    setDateFormat,
    selected,
    setselected,
    dashboardStyle,
    dashboardSetStyle,
    columns,
    setColumns,
    tableLoading,
    setTableLoading,
    pageNum,
    setPageNum,
    paginationData,
    setPaginationData,
    sorting,
    setSorting,
    search,
    setSearchTerm,
    files,
    setFiles,
  };
  return <TableContext.Provider value={value}>{props.children}</TableContext.Provider>;
}

export default TableContextProvider;
