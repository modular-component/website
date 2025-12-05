import React, {useLayoutEffect} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Logo from '@site/static/img/logo.svg';
import {
  FaAlignLeft,
  FaAsterisk,
  FaChevronRight,
  FaDownload,
  FaMagnifyingGlass,
  FaMicrochip,
  FaMicroscope,
  FaPlus
} from "react-icons/fa6";

import styles from './index.module.css'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string;
}

function IconShapes({size = '1em', ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" className="nc-icon-wrapper">
        <path
          d="M17.2 2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8L22 9.2C22 10.8802 22 11.7202 21.673 12.362C21.3854 12.9265 20.9265 13.3854 20.362 13.673C19.7202 14 18.8802 14 17.2 14H14.8C13.1198 14 12.2798 14 11.638 13.673C11.0735 13.3854 10.6146 12.9265 10.327 12.362C10 11.7202 10 10.8802 10 9.2L10 6.8C10 5.11984 10 4.27976 10.327 3.63803C10.6146 3.07354 11.0735 2.6146 11.638 2.32698C12.2798 2 13.1198 2 14.8 2L17.2 2Z"
          fill="url(#ywqw6soj4ii-1760522037876-2830671_shapes_existing_0_3s8gtsgok)" data-glass="origin"
          mask="url(#ywqw6soj4ii-1760522037876-2830671_shapes_mask_pie61oui2)"></path>
        <path
          d="M17.2 2C18.8802 2 19.7202 2 20.362 2.32698C20.9265 2.6146 21.3854 3.07354 21.673 3.63803C22 4.27976 22 5.11984 22 6.8L22 9.2C22 10.8802 22 11.7202 21.673 12.362C21.3854 12.9265 20.9265 13.3854 20.362 13.673C19.7202 14 18.8802 14 17.2 14H14.8C13.1198 14 12.2798 14 11.638 13.673C11.0735 13.3854 10.6146 12.9265 10.327 12.362C10 11.7202 10 10.8802 10 9.2L10 6.8C10 5.11984 10 4.27976 10.327 3.63803C10.6146 3.07354 11.0735 2.6146 11.638 2.32698C12.2798 2 13.1198 2 14.8 2L17.2 2Z"
          fill="url(#ywqw6soj4ii-1760522037876-2830671_shapes_existing_0_3s8gtsgok)" data-glass="clone"
          filter="url(#ywqw6soj4ii-1760522037876-2830671_shapes_filter_pky57diox)"
          clipPath="url(#ywqw6soj4ii-1760522037876-2830671_shapes_clipPath_0yzvvnvbs)"></path>
        <path
          d="M1 11.5C1 7.91015 3.91015 5 7.5 5C11.0898 5 14 7.91015 14 11.5C14 15.0899 11.0898 18 7.5 18C3.91015 18 1 15.0899 1 11.5Z"
          fill="url(#ywqw6soj4ii-1760522037876-2830671_shapes_existing_1_x3vfmzlrv)" data-glass="blur"></path>
        <path
          d="M13.25 11.5C13.25 8.32436 10.6756 5.75 7.5 5.75C4.32436 5.75 1.75 8.32436 1.75 11.5C1.75 14.6756 4.32436 17.25 7.5 17.25V18C3.91015 18 1 15.0899 1 11.5C1 7.91015 3.91015 5 7.5 5C11.0898 5 14 7.91015 14 11.5C14 15.0899 11.0898 18 7.5 18V17.25C10.6756 17.25 13.25 14.6756 13.25 11.5Z"
          fill="url(#ywqw6soj4ii-1760522037876-2830671_shapes_existing_2_qkl2q89uy)"></path>
        <path
          d="M16.2096 10.8158C15.4308 9.53305 13.5692 9.53305 12.7904 10.8158L7.84447 18.962C7.03524 20.2949 7.99477 22 9.55404 22L14.5 22L19.4459 22C21.0052 22 21.9647 20.2949 21.1555 18.962L16.2096 10.8158Z"
          fill="url(#ywqw6soj4ii-1760522037876-2830671_shapes_existing_3_6dgypxtwj)"></path>
        <defs>
          <linearGradient id="ywqw6soj4ii-1760522037876-2830671_shapes_existing_0_3s8gtsgok" x1="16" y1="-.048" x2="16"
                          y2="9.8" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-1-color-1,#575757)" data-glass-11="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-1-color-2,#151515)" data-glass-12="on"></stop>
          </linearGradient>
          <linearGradient id="ywqw6soj4ii-1760522037876-2830671_shapes_existing_1_x3vfmzlrv" x1="7.5" y1="5" x2="7.5"
                          y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-2-color-1,#E3E3E599)" data-glass-21="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-2-color-2,#BBBBC099)" data-glass-22="on"></stop>
          </linearGradient>
          <linearGradient id="ywqw6soj4ii-1760522037876-2830671_shapes_existing_2_qkl2q89uy" x1="7.5" y1="5" x2="7.5"
                          y2="12.528" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-light,#fff)" data-glass-light="on"></stop>
            <stop offset="1" stopColor="var(--nc-light,#fff)" stopOpacity="0" data-glass-light="on"></stop>
          </linearGradient>
          <linearGradient id="ywqw6soj4ii-1760522037876-2830671_shapes_existing_3_6dgypxtwj" x1="14.5" y1="8" x2="14.5"
                          y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-1-color-1,#575757)" data-glass-11="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-1-color-2,#151515)" data-glass-12="on"></stop>
          </linearGradient>
          <filter id="ywqw6soj4ii-1760522037876-2830671_shapes_filter_pky57diox" x="-100%" y="-100%" width="400%"
                  height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none"
                            result="blur"></feGaussianBlur>
          </filter>
          <clipPath id="ywqw6soj4ii-1760522037876-2830671_shapes_clipPath_0yzvvnvbs">
            <path
              d="M1 11.5C1 7.91015 3.91015 5 7.5 5C11.0898 5 14 7.91015 14 11.5C14 15.0899 11.0898 18 7.5 18C3.91015 18 1 15.0899 1 11.5Z"
              fill="url(#ywqw6soj4ii-1760522037876-2830671_shapes_existing_1_x3vfmzlrv)"></path>
          </clipPath>
          <mask id="ywqw6soj4ii-1760522037876-2830671_shapes_mask_pie61oui2">
            <rect width="100%" height="100%" fill="#FFF"></rect>
            <path
              d="M1 11.5C1 7.91015 3.91015 5 7.5 5C11.0898 5 14 7.91015 14 11.5C14 15.0899 11.0898 18 7.5 18C3.91015 18 1 15.0899 1 11.5Z"
              fill="#000"></path>
          </mask>
        </defs>
      </g>
    </svg>
  );
}

function IconBulletList({size = '1em', ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" className="nc-icon-wrapper">
        <path
          d="M6 13C8.20914 13 10 14.7909 10 17C10 19.2091 8.20914 21 6 21C3.79086 21 2 19.2091 2 17C2 14.7909 3.79086 13 6 13ZM6 3C8.20914 3 10 4.79086 10 7C10 9.20914 8.20914 11 6 11C3.79086 11 2 9.20914 2 7C2 4.79086 3.79086 3 6 3ZM6 5.5C5.17157 5.5 4.5 6.17157 4.5 7C4.5 7.82843 5.17157 8.5 6 8.5C6.82843 8.5 7.5 7.82843 7.5 7C7.5 6.17157 6.82843 5.5 6 5.5Z"
          fill="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_0_o560rcp5g)" data-glass="blur"></path>
        <path
          d="M21 16C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H13C12.4477 18 12 17.5523 12 17C12 16.4477 12.4477 16 13 16H21ZM6 5C7.10457 5 8 5.89543 8 7C8 8.10457 7.10457 9 6 9C4.89543 9 4 8.10457 4 7C4 5.89543 4.89543 5 6 5ZM21 6C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H13C12.4477 8 12 7.55228 12 7C12 6.44772 12.4477 6 13 6H21Z"
          fill="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_1_ujf4uwf2p)" data-glass="origin"
          mask="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_mask_ggxv7pq11)"></path>
        <path
          d="M21 16C21.5523 16 22 16.4477 22 17C22 17.5523 21.5523 18 21 18H13C12.4477 18 12 17.5523 12 17C12 16.4477 12.4477 16 13 16H21ZM6 5C7.10457 5 8 5.89543 8 7C8 8.10457 7.10457 9 6 9C4.89543 9 4 8.10457 4 7C4 5.89543 4.89543 5 6 5ZM21 6C21.5523 6 22 6.44772 22 7C22 7.55228 21.5523 8 21 8H13C12.4477 8 12 7.55228 12 7C12 6.44772 12.4477 6 13 6H21Z"
          fill="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_1_ujf4uwf2p)" data-glass="clone"
          filter="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_filter_v5d6lg1sb)"
          clipPath="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_clipPath_tknh1fdqd)"></path>
        <path
          d="M6 3C8.20914 3 10 4.79086 10 7C10 9.20914 8.20914 11 6 11C3.79086 11 2 9.20914 2 7C2 4.79086 3.79086 3 6 3ZM6 3.75C4.20508 3.75 2.75 5.20507 2.75 7C2.75 8.79493 4.20508 10.25 6 10.25C7.79492 10.25 9.25 8.79493 9.25 7C9.25 5.20507 7.79492 3.75 6 3.75Z"
          fill="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_2_jlsd2crya)"></path>
        <path
          d="M6 13C8.20914 13 10 14.7909 10 17C10 19.2091 8.20914 21 6 21C3.79086 21 2 19.2091 2 17C2 14.7909 3.79086 13 6 13ZM6 13.75C4.20508 13.75 2.75 15.2051 2.75 17C2.75 18.7949 4.20508 20.25 6 20.25C7.79492 20.25 9.25 18.7949 9.25 17C9.25 15.2051 7.79492 13.75 6 13.75Z"
          fill="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_3_0wfkvg9bg)"></path>
        <defs>
          <linearGradient id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_0_o560rcp5g" x1="6" y1="3" x2="6"
                          y2="21" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-2-color-1,#E3E3E599)" data-glass-21="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-2-color-2,#BBBBC099)" data-glass-22="on"></stop>
          </linearGradient>
          <linearGradient id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_1_ujf4uwf2p" x1="13" y1="-1.019"
                          x2="13" y2="18" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-1-color-1,#575757)" data-glass-11="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-1-color-2,#151515)" data-glass-12="on"></stop>
          </linearGradient>
          <linearGradient id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_2_jlsd2crya" x1="6" y1="3" x2="6"
                          y2="7.633" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-light,#fff)" data-glass-light="on"></stop>
            <stop offset="1" stopColor="var(--nc-light,#fff)" stopOpacity="0" data-glass-light="on"></stop>
          </linearGradient>
          <linearGradient id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_3_0wfkvg9bg" x1="6" y1="13" x2="6"
                          y2="17.633" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-light,#fff)" data-glass-light="on"></stop>
            <stop offset="1" stopColor="var(--nc-light,#fff)" stopOpacity="0" data-glass-light="on"></stop>
          </linearGradient>
          <filter id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_filter_v5d6lg1sb" x="-100%" y="-100%" width="400%"
                  height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none"
                            result="blur"></feGaussianBlur>
          </filter>
          <clipPath id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_clipPath_tknh1fdqd">
            <path
              d="M6 13C8.20914 13 10 14.7909 10 17C10 19.2091 8.20914 21 6 21C3.79086 21 2 19.2091 2 17C2 14.7909 3.79086 13 6 13ZM6 3C8.20914 3 10 4.79086 10 7C10 9.20914 8.20914 11 6 11C3.79086 11 2 9.20914 2 7C2 4.79086 3.79086 3 6 3ZM6 5.5C5.17157 5.5 4.5 6.17157 4.5 7C4.5 7.82843 5.17157 8.5 6 8.5C6.82843 8.5 7.5 7.82843 7.5 7C7.5 6.17157 6.82843 5.5 6 5.5Z"
              fill="url(#gwf3ws8d0bh-1760519092839-7071259_bullet-list_existing_0_o560rcp5g)"></path>
          </clipPath>
          <mask id="gwf3ws8d0bh-1760519092839-7071259_bullet-list_mask_ggxv7pq11">
            <rect width="100%" height="100%" fill="#FFF"></rect>
            <path
              d="M6 13C8.20914 13 10 14.7909 10 17C10 19.2091 8.20914 21 6 21C3.79086 21 2 19.2091 2 17C2 14.7909 3.79086 13 6 13ZM6 3C8.20914 3 10 4.79086 10 7C10 9.20914 8.20914 11 6 11C3.79086 11 2 9.20914 2 7C2 4.79086 3.79086 3 6 3ZM6 5.5C5.17157 5.5 4.5 6.17157 4.5 7C4.5 7.82843 5.17157 8.5 6 8.5C6.82843 8.5 7.5 7.82843 7.5 7C7.5 6.17157 6.82843 5.5 6 5.5Z"
              fill="#000"></path>
          </mask>
        </defs>
      </g>
    </svg>
  );
}

function IconRulerPen({size = '1em', ...props}: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" className="nc-icon-wrapper">
        <path
          d="M17.5715 18.9907L15.4578 21.1044C16.1167 21.7634 16.4462 22.0929 16.8138 22.2451C17.3038 22.4481 17.8544 22.4481 18.3445 22.2451C18.712 22.0929 19.0415 21.7634 19.7004 21.1044L20.9656 19.8392C21.7577 19.0472 22.1537 18.6512 22.3021 18.1945C22.4326 17.7928 22.4326 17.3602 22.3021 16.9585C22.1537 16.5018 21.7577 16.1058 20.9656 15.3138L8.68617 3.03429C7.89414 2.24226 7.49812 1.84624 7.04147 1.69786C6.63978 1.56735 6.20709 1.56735 5.8054 1.69786C5.34874 1.84624 4.95273 2.24226 4.16069 3.03429L2.88793 4.30705C2.23399 4.96099 1.90702 5.28796 1.75489 5.65182C1.54754 6.14773 1.54854 6.70624 1.75766 7.20141C1.91109 7.56471 2.23923 7.89051 2.89551 8.54211L5.00924 6.42838C5.39976 6.03786 6.03293 6.03786 6.42345 6.42838C6.81398 6.81891 6.81398 7.45207 6.42345 7.8426L4.30213 9.96392L14.036 19.6978L16.1573 17.5765C16.5478 17.186 17.181 17.186 17.5715 17.5765C17.9621 17.967 17.9621 18.6002 17.5715 18.9907Z"
          fill="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_0_aut75e2kp)" data-glass="origin"
          mask="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_mask_alrdoff0r)"></path>
        <path
          d="M17.5715 18.9907L15.4578 21.1044C16.1167 21.7634 16.4462 22.0929 16.8138 22.2451C17.3038 22.4481 17.8544 22.4481 18.3445 22.2451C18.712 22.0929 19.0415 21.7634 19.7004 21.1044L20.9656 19.8392C21.7577 19.0472 22.1537 18.6512 22.3021 18.1945C22.4326 17.7928 22.4326 17.3602 22.3021 16.9585C22.1537 16.5018 21.7577 16.1058 20.9656 15.3138L8.68617 3.03429C7.89414 2.24226 7.49812 1.84624 7.04147 1.69786C6.63978 1.56735 6.20709 1.56735 5.8054 1.69786C5.34874 1.84624 4.95273 2.24226 4.16069 3.03429L2.88793 4.30705C2.23399 4.96099 1.90702 5.28796 1.75489 5.65182C1.54754 6.14773 1.54854 6.70624 1.75766 7.20141C1.91109 7.56471 2.23923 7.89051 2.89551 8.54211L5.00924 6.42838C5.39976 6.03786 6.03293 6.03786 6.42345 6.42838C6.81398 6.81891 6.81398 7.45207 6.42345 7.8426L4.30213 9.96392L14.036 19.6978L16.1573 17.5765C16.5478 17.186 17.181 17.186 17.5715 17.5765C17.9621 17.967 17.9621 18.6002 17.5715 18.9907Z"
          fill="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_0_aut75e2kp)" data-glass="clone"
          filter="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_filter_2dcgk6oxb)"
          clipPath="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_clipPath_eehexvvp0)"></path>
        <path
          d="M16.0771 3.07477C17.4157 1.73621 19.5851 1.73739 20.9238 3.07574C22.2624 4.4144 22.2634 6.58376 20.9248 7.92242L9.27143 19.5757C8.65647 20.1907 7.34222 20.7042 5.99799 21.0992L5.99995 21.1011C5.12972 21.3568 4.24347 21.5669 3.35053 21.7496C2.68534 21.8856 2.11387 21.3141 2.24995 20.649C2.37524 20.0374 2.5473 19.2784 2.75874 18.5015L2.75678 18.4996C3.16721 16.9926 3.73276 15.4191 4.42378 14.7281L16.0771 3.07477Z"
          fill="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_1_5id9ssfzo)" data-glass="blur"></path>
        <path
          d="M16.0771 3.07547C17.4157 1.73681 19.5851 1.73778 20.9237 3.07644C22.2623 4.41511 22.2633 6.58449 20.9247 7.92312L9.27139 19.5764L9.16788 19.6731C8.03362 20.6704 5.09211 21.3929 3.34952 21.7493L3.22647 21.7669C2.65678 21.8108 2.18858 21.3423 2.23233 20.7727L2.24991 20.6487C2.60682 18.9065 3.3298 15.9664 4.32706 14.8323L4.42374 14.7288L16.0771 3.07547ZM20.3935 3.60672C19.3474 2.56063 17.6528 2.5603 16.6073 3.60574L4.95401 15.2591C4.77846 15.4347 4.5779 15.7372 4.36905 16.1692C4.1646 16.5922 3.97183 17.097 3.79483 17.6399C3.44087 18.7257 3.16589 19.9126 2.98428 20.7991C2.96854 20.8759 2.99224 20.9319 3.0292 20.969C3.06628 21.0061 3.12226 21.0305 3.19913 21.0149C4.08593 20.8335 5.27399 20.5582 6.36026 20.2044C6.90337 20.0275 7.40791 19.8346 7.83096 19.6302C8.26301 19.4214 8.56551 19.2217 8.74112 19.0462L20.3944 7.39187C21.4398 6.34645 21.4395 4.65278 20.3935 3.60672Z"
          fill="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_2_8pb1frn03)"></path>
        <defs>
          <linearGradient id="0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_0_aut75e2kp" x1="12" y1="1.6"
                          x2="12" y2="22.397" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-1-color-1,#575757)" data-glass-11="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-1-color-2,#151515)" data-glass-12="on"></stop>
          </linearGradient>
          <linearGradient id="0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_1_5id9ssfzo" x1="12.079" y1="2.071"
                          x2="12.079" y2="21.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-gradient-2-color-1,#E3E3E599)" data-glass-21="on"></stop>
            <stop offset="1" stopColor="var(--nc-gradient-2-color-2,#BBBBC099)" data-glass-22="on"></stop>
          </linearGradient>
          <linearGradient id="0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_2_8pb1frn03" x1="12.079" y1="2.072"
                          x2="12.079" y2="13.479" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--nc-light,#fff)" data-glass-light="on"></stop>
            <stop offset="1" stopColor="var(--nc-light,#fff)" stopOpacity="0" data-glass-light="on"></stop>
          </linearGradient>
          <filter id="0tqudrv3e6pb-1752500502802-4771403_ruler-pen_filter_2dcgk6oxb" x="-100%" y="-100%" width="400%"
                  height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none"
                            result="blur"></feGaussianBlur>
          </filter>
          <clipPath id="0tqudrv3e6pb-1752500502802-4771403_ruler-pen_clipPath_eehexvvp0">
            <path
              d="M16.0771 3.07477C17.4157 1.73621 19.5851 1.73739 20.9238 3.07574C22.2624 4.4144 22.2634 6.58376 20.9248 7.92242L9.27143 19.5757C8.65647 20.1907 7.34222 20.7042 5.99799 21.0992L5.99995 21.1011C5.12972 21.3568 4.24347 21.5669 3.35053 21.7496C2.68534 21.8856 2.11387 21.3141 2.24995 20.649C2.37524 20.0374 2.5473 19.2784 2.75874 18.5015L2.75678 18.4996C3.16721 16.9926 3.73276 15.4191 4.42378 14.7281L16.0771 3.07477Z"
              fill="url(#0tqudrv3e6pb-1752500502802-4771403_ruler-pen_existing_1_5id9ssfzo)"></path>
          </clipPath>
          <mask id="0tqudrv3e6pb-1752500502802-4771403_ruler-pen_mask_alrdoff0r">
            <rect width="100%" height="100%" fill="#FFF"></rect>
            <path
              d="M16.0771 3.07477C17.4157 1.73621 19.5851 1.73739 20.9238 3.07574C22.2624 4.4144 22.2634 6.58376 20.9248 7.92242L9.27143 19.5757C8.65647 20.1907 7.34222 20.7042 5.99799 21.0992L5.99995 21.1011C5.12972 21.3568 4.24347 21.5669 3.35053 21.7496C2.68534 21.8856 2.11387 21.3141 2.24995 20.649C2.37524 20.0374 2.5473 19.2784 2.75874 18.5015L2.75678 18.4996C3.16721 16.9926 3.73276 15.4191 4.42378 14.7281L16.0771 3.07477Z"
              fill="#000"></path>
          </mask>
        </defs>
      </g>
    </svg>
  );
}

function HomepageContent() {
  const {siteConfig} = useDocusaurusContext();

  useLayoutEffect(() => {
    const update = () => {
      document.getElementById('bg').style.top = (-window.scrollY * 2 / 3) + 'px'
    }
    window.addEventListener('scroll', update)
    update()
    return () => window.removeEventListener('scroll', update)
  }, []);

  return (
    <>
      <div id="bg" className={styles.bg} aria-hidden="true"></div>

      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.nav}>
            <a className={styles.brand} href="https://github.com/modular-component/modular-component" target="_blank">
              <div className={styles.logo} aria-hidden="true">
                <Logo data-logo className={styles.heroLogo}/>
              </div>
              <div>
                <strong data-code>ModularComponent</strong>
                <span>🍞<wbr/>.with(🍅)<wbr/>.with(🧀) = 🥪</span>
              </div>
            </a>

            <div className={styles.navCta}>
              <a className={styles.btn + ' ' + styles.ghost} href="/docs/reference">
                Reference
                <FaAsterisk/>
              </a>
              <a className={styles.btn + ' ' + styles.primary} href="/docs/intro">
                Get started
                <FaChevronRight/>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div>
                <div className={styles.kicker}>
                  <span className={styles.dot} aria-hidden="true"></span>
                  Typed factory pipeline for React components
                </div>

                <h1 className={styles.h1}>Build components through clean, predictable pipelines</h1>
                <p className={styles.subhead}>
                  <strong data-code>ModularComponent</strong> composes React components through a modular factory: add
                  capabilities stage-by-stage,
                  keep concerns isolated, and make testing feel native.
                </p>

                <div className={styles.heroActions}>
                  <a className={styles.btn + ' ' + styles.primary} href="/docs/intro">
                    Read the docs
                    <FaChevronRight/>
                  </a>
                  <a className={styles.btn} href="/docs/extensions/writing-extensions">
                    Write an extension
                    <FaPlus/>
                  </a>
                  <a className={styles.btn + ' ' + styles.ghost} href="/docs/intro#installation">
                    Install
                    <FaDownload/>
                  </a>
                </div>

                <div className={styles.heroMeta}>
                  <span className={styles.pill}><code>.with()</code> compose stages</span>
                  <span className={styles.pill}><code>.use()</code> generate hooks</span>
                  <span className={styles.pill}><code>.stage()</code> isolate for tests</span>
                </div>
              </div>

              <aside className={styles.card + ' ' + styles.codecard} aria-label="Example code">
                <div className={styles.cardHead}>
                  <div className={styles.windowDots} aria-hidden="true"><i></i><i></i><i></i></div>
                  <div className={styles.label}>Modular factory pipeline</div>
                </div>
                <pre><code><span className={styles.tokC}>// install</span>
<br/>
npm i <span className={styles.tokS}>@modular-component/core</span> <span
                    className={styles.tokS}>@modular-component/default</span>
<br/>
<br/>
<span className={styles.tokC}>// register stages (recommended)</span>
<br/>
<span className={styles.tokK}>import</span> <span className={styles.tokS}>'@modular-component/default/register'</span>
<br/>
<span className={styles.tokK}>import</span> &#123; <span className={styles.tokF}>ModularComponent</span> &#125; <span
                    className={styles.tokK}>from</span> <span className={styles.tokS}>'@modular-component/core'</span>
<br/>
<br/>

<span className={styles.tokK}>export</span> <span className={styles.tokK}>const</span> <span
                    className={styles.tokF}>Counter</span> = <span
                    className={styles.tokF}>ModularComponent</span>&lt;&#123;
                  <br/>&nbsp;
                  step?: number
                  <br/>
                  &#125;&gt;(<span
                    className={styles.tokS}>'Counter'</span>)
<br/>&nbsp;
                  .<span className={styles.tokF}>withDefaultProps</span>(&#123; step: <span
                    className={styles.tokK}>1</span> &#125;)
<br/>&nbsp;
                  .<span className={styles.tokF}>withLifecycle</span>((&#123; props &#125;) =&gt; &#123;
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={styles.tokK}>const</span> [count, setCount] = <span
                    className={styles.tokF}>useState</span>(<span className={styles.tokK}>0</span>)
                  <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className={styles.tokK}>return</span> &#123; count, inc: () =&gt; <span
                    className={styles.tokF}>setCount</span>(c =&gt; c + props.step) &#125;
                  <br/>&nbsp;
                  &#125;)
                  <br/>&nbsp;
                  .<span className={styles.tokF}>withRender</span>((&#123; lifecycle &#125;) =&gt; (
                  <br/>&nbsp;&nbsp;&nbsp;
                  &lt;<span
                    className={styles.tokF}>button</span> onClick=&#123;lifecycle.inc&#125;&gt;&#123;lifecycle.count&#125;&lt;/<span
                    className={styles.tokF}>button</span>&gt;
                  <br/>&nbsp;
                  ))</code></pre>
              </aside>
            </div>
          </div>
        </div>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>What it brings</h2>
                <p className={styles.sectionDesc}>
                  The factory approach lets you add functionality as the component is built, keeping JSX focused while
                  other stages handle state, wiring, and cross-cutting concerns.
                </p>
              </div>
            </div>

            <div className={styles.features} role="list">
              <article className={styles.feature} role="listitem">
                <div className={styles.ficon} aria-hidden="true">
                  <IconShapes/>
                </div>
                <h3>Extensible factory</h3>
                <p>Compose reusable stages to build consistent components across your codebase.</p>
              </article>

              <article className={styles.feature} role="listitem">
                <div className={styles.ficon} aria-hidden="true">
                  <IconBulletList/>
                </div>
                <h3>Delightfully organized</h3>
                <p>Separate markup, lifecycle/state, and wiring—without losing readability.</p>
              </article>

              <article className={styles.feature} role="listitem">
                <div className={styles.ficon} aria-hidden="true">
                  <IconRulerPen/>
                </div>
                <h3>Deeply testable</h3>
                <p>Isolate stages for tests, or turn pipelines into hooks when you don’t need rendering.</p>
              </article>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>How it works</h2>
                <p className={styles.sectionDesc}>
                  Build a pipeline of ordered stages. Each stage populates a shared argument map for downstream stages.
                </p>
              </div>
            </div>

            <div className={styles.pipeline}>
              <div className={styles.pipeRow}>
                <div className={styles.diagram} aria-label="Pipeline diagram">
                  <div className={styles.nodes}>
                    <div className={styles.node}>
                      <strong>props</strong>
                      <span>defaults, validation, adapters</span>
                    </div>
                    <div className={styles.node}>
                      <strong>logic</strong>
                      <span>hooks, state, effects, data</span>
                    </div>
                    <div className={styles.node}>
                      <strong>render</strong>
                      <span>focused JSX, minimal glue</span>
                    </div>
                  </div>
                </div>

                <div className={styles.callouts}>
                  <h3>Smart patterns and helpers</h3>

                  <div className={styles.callout}>
                    <code>.use()</code>
                    <p>Turn a pipeline into a hook (or isolate a single field).</p>
                  </div>

                  <div className={styles.callout}>
                    <code>.stage()</code>
                    <p>Extract a stage to unit-test it with fully controlled inputs.</p>
                  </div>

                  <div className={styles.callout}>
                    <code>/register</code>
                    <p>Extensions offer a register entrypoint for automatic stage registration.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.container}>
            <div className={styles.sectionHead}>
              <div>
                <h2>Get started now</h2>
                <p className={styles.sectionDesc}>
                  Start with the core factory, add the default stage pack, and add on your custom stages as your app
                  needs.
                </p>
              </div>
            </div>

            <div className={styles.split}>
              <div className={styles.panel}>
                <h3>Install</h3>
                <p>Core and the recommended default capability pack.</p>
                <div className={styles.miniPre}>
                  <pre><code>npm install <span
                    className={styles.tokS}>@modular-component/core @modular-component/default</span></code></pre>
                </div>

                <div style={{height: '40px'}}></div>

                <h3>Register stages</h3>
                <p>Keep component definitions clean with stage registration.</p>
                <div className={styles.miniPre}>
                  <pre><code><span className={styles.tokK}>import</span> <span
                    className={styles.tokS}>'@modular-component/default/register'</span></code></pre>
                </div>
              </div>

              <div className={styles.panel}>
                <h3>Define a pipeline</h3>
                <p>Compose stages with a readable chain and keep JSX at the edge.</p>
                <div className={styles.miniPre}>
            <pre><code><span className={styles.tokK}>const</span> <span
              className={styles.tokF}>MyComponent</span> = <span
              className={styles.tokF}>ModularComponent</span>&lt;&#123; label: string &#125;&gt;()
              <br/>&nbsp;
              .<span className={styles.tokF}>withDefaultProps</span>(&#123; label: <span
                className={styles.tokS}>'Hello'</span> &#125;)
              <br/>&nbsp;
              .<span className={styles.tokF}>withLifecycle</span>((&#123; props &#125;) =&gt; (&#123;
              <br/>&nbsp;&nbsp;&nbsp;
              upper: props.label.<span
                className={styles.tokF}>toUpperCase</span>()
              <br/>&nbsp;
              &#125;))
              <br/>&nbsp;
              .<span className={styles.tokF}>withRender</span>((&#123; lifecycle &#125;) =&gt; (
              <br/>&nbsp;&nbsp;&nbsp;
              &lt;<span
                className={styles.tokF}>h2</span>&gt;&#123;lifecycle.upper&#125;&lt;/<span
                className={styles.tokF}>h2</span>&gt;
              <br/>&nbsp;
              ))</code></pre>
                </div>

                <div className={styles.heroActions}>
                  <a className={styles.btn + ' ' + styles.primary} href="/docs/intro">
                    Dive deeper
                    <FaChevronRight/>
                  </a>
                  <a className={styles.btn} href="/docs/extensions/writing-extensions">Explore
                    extensions
                    <FaMagnifyingGlass/>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="Delightfully organized and deeply testable React Components">
      <HomepageContent/>
    </Layout>
  );
}
