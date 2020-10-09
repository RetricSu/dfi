/* eslint-disable */
import React, { useState, useEffect, createContext } from 'react';
import { useTranslation } from 'react-i18next';
import BigNumber from "bignumber.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/CustomOutlinedInput/CustomOutlinedInput';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import {primaryColor} from "assets/jss/material-kit-pro-react.js";
// core components
import Button from "components/CustomButtons/Button.js";
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import CustomInput from "components/CustomInput/CustomInput.js";
import SectionPoolsCard from './SectionPoolsCard';
// sections for this section
// import SectionOpenedPool from "./SectionOpenedPool";
import { useSnackbar } from 'notistack';
//  hooks
import { useConnectWallet } from '../../home/redux/hooks';
import { useFetchPoolsInfo, useFetchBalance, useFetchBalances } from '../redux/hooks';
import CustomSlider from 'components/CustomSlider/CustomSlider';
import { isEmpty } from 'features/helpers/utils';
import sectionPoolsStyle from "../jss/sections/sectionPoolsStyle";

const useStyles = makeStyles(sectionPoolsStyle);

export default function SectionPools() {
  const { t, i18n } = useTranslation();
  const { web3, address, networkId } = useConnectWallet();
  const { pools, poolsInfo, fetchPoolsInfo } = useFetchPoolsInfo();
//   const { pools, fetchPoolBalance } = useFetchPoolBalance();
  const { etherBalance, fetchBalance } = useFetchBalance();
  const { erc20Tokens, fetchBalances } = useFetchBalances();
  const [ cardIsOpenedList, setCardIsOpenedList ] = useState(Array(pools.length).fill(false));
  const classes = useStyles();

//   const { fetchApproval, fetchApprovalPending } = useFetchApproval();
//   const { fetchDeposit, fetchDepositEth, fetchDepositPending } = useFetchDeposit();
//   const { fetchWithdraw, fetchWithdrawEth, fetchWithdrawPending } = useFetchWithdraw();
//   const { contractApy, fetchContractApy } = useFetchContractApy();

//   const [ depositedBalance, setDepositedBalance ] = useState({});
//   const [ withdrawAmount, setWithdrawAmount ] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (address && web3) {
      fetchPoolsInfo()
      fetchBalance();
      fetchBalances();
    //   fetchPoolBalances({address, web3, pools});
    //   const id = setInterval(() => {
    //     fetchBalances({address, web3, tokens});
    //     fetchPoolBalances({address, web3, pools});
    //   }, 10000);
    //   return () => clearInterval(id);
    }
  }, [address, web3, fetchBalance]);

  
  const openCard = id => {
    return setCardIsOpenedList(
      cardIsOpenedList => {
        if(cardIsOpenedList.includes(id)) {
          return cardIsOpenedList.filter(item => item!==id)
        } else {
          return [...cardIsOpenedList, id]
        }
      }
    )
  } 

  return (
    <Grid container style={{paddingTop: '4px'}}>
      <Grid item xs={12}>
        <div className={classes.mainTitle}>{t('Vault-Main-Title')}</div>
        <h3 className={classes.secondTitle}>{t('Vault-Second-Title')}</h3>
      </Grid>
      {Boolean(networkId === Number(process.env.NETWORK_ID)) && pools.map((pool, poolIndex) => {
        return (
          <SectionPoolsCard
            pool={pool}
            poolIndex={poolIndex}
            cardIsOpenedList={cardIsOpenedList}
            openCard={openCard}/>  
        )
        })}
      
    </Grid>
  )
}
