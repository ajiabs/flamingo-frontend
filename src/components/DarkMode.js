/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from './DarkMode.module.scss';
import { TableContext } from '../contexts/tableContext';

function DarkMode() {
  const { bodySetStyle, headerbgSetStyle, profiledropdownSetStyle } = useContext(TableContext);
  const { bodyheaderSetStyle } = useContext(TableContext);
  const { leftmenuSetStyle } = useContext(TableContext);
  const { leftmenuSetlinks } = useContext(TableContext);
  const { searchboxSetStyle } = useContext(TableContext);
  const { tableheadSetStyle } = useContext(TableContext);
  const { tablebodySetStyle } = useContext(TableContext);
  const { paginationSetStyle } = useContext(TableContext);
  const { formthemeSetStyle } = useContext(TableContext);
  const { viewformSetStyle } = useContext(TableContext);
  const { permissionboxSetStyle, actionbtnSetStyle } = useContext(TableContext);
  const { graphbgSetStyle, agheaderbgSetStyle, leftmenuSetlinkSelected } = useContext(TableContext);
  const { card1bgSetStyle, card2bgSetStyle, card3bgSetStyle, card4bgSetStyle } =
    useContext(TableContext);
  const clickedClass = 'clicked';
  const { body } = document;
  const lightTheme = 'light';
  const darkTheme = 'dark';
  const [Completed, setCompleted] = useState(null);

  const switchTheme = (e) => {
    if (localStorage.getItem('theme') === 'dark') {
      bodySetStyle('bodythemelight');
      headerbgSetStyle('headerthemelight');
      bodyheaderSetStyle('headinglight');
      leftmenuSetStyle('menuthemelight');
      leftmenuSetlinks('menulinklight');
      searchboxSetStyle('searchboxlight');
      tableheadSetStyle('tableheadlight');
      tablebodySetStyle('tablebodylight');
      paginationSetStyle('paginationlight');
      formthemeSetStyle('formthemelight');
      viewformSetStyle('viewformlight');
      permissionboxSetStyle('permissionboxlight');
      graphbgSetStyle('graphclrlight');
      card1bgSetStyle('card1bglight');
      card2bgSetStyle('card2bglight');
      card3bgSetStyle('card3bglight');
      card4bgSetStyle('card4bglight');
      agheaderbgSetStyle('agheaderbglight');
      leftmenuSetlinkSelected('menulinklightSelected');
      actionbtnSetStyle('actionbtnlight');
      profiledropdownSetStyle('profiledropdownlight');
      localStorage.setItem('theme', 'light');
      setCompleted(false);
    } else {
      bodySetStyle('bodythemedark');
      headerbgSetStyle('headerthemedark');
      bodyheaderSetStyle('headingdark');
      leftmenuSetStyle('menuthemedark');
      leftmenuSetlinks('menulinkdark');
      searchboxSetStyle('searchboxdark');
      tableheadSetStyle('tableheaddark');
      tablebodySetStyle('tablebodydark');
      paginationSetStyle('paginationdark');
      formthemeSetStyle('formthemedark');
      viewformSetStyle('viewformdark');
      permissionboxSetStyle('permissionboxdark');
      graphbgSetStyle('graphclrdark');
      card1bgSetStyle('card1bgdark');
      card2bgSetStyle('card2bgdark');
      card3bgSetStyle('card3bgdark');
      card4bgSetStyle('card4bgdark');
      agheaderbgSetStyle('agheaderbgdark');
      leftmenuSetlinkSelected('menulinkdarkSelected');
      actionbtnSetStyle('actionbtndark');
      profiledropdownSetStyle('profiledropdowndark');
      body.classList.replace(lightTheme, darkTheme);
      e.target.classList.add(clickedClass);
      localStorage.setItem('theme', 'dark');
      setCompleted(true);
    }
  };

  useEffect(
    () => {
      if (localStorage.getItem('theme') === 'dark') {
        bodySetStyle('bodythemedark');
        headerbgSetStyle('headerthemedark');
        bodyheaderSetStyle('headingdark');
        leftmenuSetStyle('menuthemedark');
        leftmenuSetlinks('menulinkdark');
        searchboxSetStyle('searchboxdark');
        tableheadSetStyle('tableheaddark');
        tablebodySetStyle('tablebodydark');
        paginationSetStyle('paginationdark');
        formthemeSetStyle('formthemedark');
        viewformSetStyle('viewformdark');
        permissionboxSetStyle('permissionboxdark');
        graphbgSetStyle('graphclrdark');
        card1bgSetStyle('card1bgdark');
        card2bgSetStyle('card2bgdark');
        card3bgSetStyle('card3bgdark');
        card4bgSetStyle('card4bgdark');
        agheaderbgSetStyle('agheaderbgdark');
        leftmenuSetlinkSelected('menulinkdarkSelected');
        actionbtnSetStyle('actionbtndark');
        profiledropdownSetStyle('profiledropdowndark');
        setCompleted(true);
      } else {
        bodySetStyle('bodythemelight');
        headerbgSetStyle('headerthemelight');
        bodyheaderSetStyle('headinglight');
        leftmenuSetStyle('menuthemelight');
        leftmenuSetlinks('menulinklight');
        searchboxSetStyle('searchboxlight');
        tableheadSetStyle('tableheadlight');
        tablebodySetStyle('tablebodylight');
        paginationSetStyle('paginationlight');
        formthemeSetStyle('formthemelight');
        viewformSetStyle('viewformlight');
        permissionboxSetStyle('permissionboxlight');
        graphbgSetStyle('graphclrlight');
        card1bgSetStyle('card1bglight');
        card2bgSetStyle('card2bglight');
        card3bgSetStyle('card3bglight');
        card4bgSetStyle('card4bglight');
        agheaderbgSetStyle('agheaderbglight');
        leftmenuSetlinkSelected('menulinklightSelected');
        actionbtnSetStyle('actionbtnlight');
        profiledropdownSetStyle('profiledropdownlight');
        setCompleted(false);
      }
    },
    Completed,
    []
  );
  return (
    <div className={styles.themediv}>
      <label
        className="switch"
        id={styles.switch}
        htmlFor="checkbox"
        title="Change color scheme to dark mode"
      >
        <input
          onClick={(e) => switchTheme(e)}
          type="checkbox"
          id="checkbox"
          className={styles.input}
          checked={Completed}
        />
        <div className={`${styles.slider} ${styles.round}`} />
        <div className={styles.toggle_moon}>
          <FontAwesomeIcon icon={faMoon} className={styles.moon} />
        </div>
        <div className={styles.toggle_sun}>
          <FontAwesomeIcon icon={faSun} className={styles.sun} />
        </div>
      </label>
    </div>
  );
}

export default DarkMode;
