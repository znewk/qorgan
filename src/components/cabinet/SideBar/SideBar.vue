<template>
    

    <div class="sidebar"  :style="isShowMenu ? {width: '15%'} : {width: '5%'}" >
        <div class="mobileMenu" @click="isShowMenu = !isShowMenu"
            :style="isShowMenu ? {justifyContent: 'center'} : {justifyContent: 'center'}"
            >
            <img :src="!isShowMenu ? '/menu.png' : '/close.png'" alt="menu" class="menuIcon" >
        </div>  
        <h1 class="logo">
            <img src="/qorgan_full_white.png" alt="logo" class="logoImg">
        </h1>

        <div class="listItems">
            <div class="subListItems">
                <div class="titleBodyy" @click="showEats = !showEats" v-if="isShowMenu">
                    <p class="subListTitle"  >{{ $t('sideBar.cafeteria') }}</p>
                    <img src="/arrow-down.png" class="icon" :style="showEats ? 'transform: rotate(180deg)' : ''">
                </div>
                

                <div class="subListItems" v-if="showEats">
                    <a class="subListItem" href="/eats-groups" :style="!isShowMenu ? 'justify-content: center;' : ''">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 9 ? 'svg active' : 'svg'">
                        <ellipse cx="8.25004" cy="6.41667" rx="3.66667" ry="3.66667" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <ellipse cx="8.25004" cy="6.41667" rx="3.66667" ry="3.66667" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.75 19.25V17.4167C2.75 15.3916 4.39162 13.75 6.41667 13.75H10.0833C12.1084 13.75 13.75 15.3916 13.75 17.4167V19.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2.75 19.25V17.4167C2.75 15.3916 4.39162 13.75 6.41667 13.75H10.0833C12.1084 13.75 13.75 15.3916 13.75 17.4167V19.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.6666 2.86914C16.289 3.28455 17.4238 4.74647 17.4238 6.42122C17.4238 8.09598 16.289 9.5579 14.6666 9.97331" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M14.6666 2.86914C16.289 3.28455 17.4238 4.74647 17.4238 6.42122C17.4238 8.09598 16.289 9.5579 14.6666 9.97331" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.25 19.2497V17.4164C19.2404 15.7522 18.1113 14.3032 16.5 13.8872" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M19.25 19.2497V17.4164C19.2404 15.7522 18.1113 14.3032 16.5 13.8872" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <span class="subListItemTitle" :class="active == 9 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.cafeteria_groups') }}</span>
                </a>

                <a class="subListItem" href="/eats-monitoring" :style="!isShowMenu ? 'justify-content: center;' : ''">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 10 ? 'svg active' : 'svg'">
                            <path d="M17.4167 7.98428L12.5281 4.18195C11.6456 3.49534 10.4095 3.49534 9.52696 4.18195L4.63746 7.98428C4.042 8.44735 3.69386 9.15954 3.69421 9.91386V16.5139C3.69421 17.5264 4.51503 18.3472 5.52755 18.3472H16.5275C17.5401 18.3472 18.3609 17.5264 18.3609 16.5139V9.91386C18.3609 9.15945 18.0125 8.4472 17.4167 7.98428" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6667 13.7501C12.6409 14.972 9.35737 14.972 7.33337 13.7501" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                    <span class="subListItemTitle" :class="active == 10 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.cafeteria_monitoring') }}</span>
                </a>

                <a class="subListItem" href="/eats-terminal" :style="!isShowMenu ? 'justify-content: center;' : ''">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 11 ? 'svg active' : 'svg'">
                            <path d="M13.75 4.5835V6.41683" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 4.5835V6.41683" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 10.0835V11.9168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 10.0835V11.9168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 15.5835V17.4168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 15.5835V17.4168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.58333 4.5835H17.4167C18.4292 4.5835 19.25 5.40431 19.25 6.41683V9.16683C18.2375 9.16683 17.4167 9.98764 17.4167 11.0002C17.4167 12.0127 18.2375 12.8335 19.25 12.8335V15.5835C19.25 16.596 18.4292 17.4168 17.4167 17.4168H4.58333C3.57081 17.4168 2.75 16.596 2.75 15.5835V12.8335C3.76252 12.8335 4.58333 12.0127 4.58333 11.0002C4.58333 9.98764 3.76252 9.16683 2.75 9.16683V6.41683C2.75 5.40431 3.57081 4.5835 4.58333 4.5835" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.58333 4.5835H17.4167C18.4292 4.5835 19.25 5.40431 19.25 6.41683V9.16683C18.2375 9.16683 17.4167 9.98764 17.4167 11.0002C17.4167 12.0127 18.2375 12.8335 19.25 12.8335V15.5835C19.25 16.596 18.4292 17.4168 17.4167 17.4168H4.58333C3.57081 17.4168 2.75 16.596 2.75 15.5835V12.8335C3.76252 12.8335 4.58333 12.0127 4.58333 11.0002C4.58333 9.98764 3.76252 9.16683 2.75 9.16683V6.41683C2.75 5.40431 3.57081 4.5835 4.58333 4.5835" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                    <span class="subListItemTitle" :class="active == 11 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.cafeteria_terminal') }}</span>
                </a>
                </div>               
            </div>

            <div class="subListItems">
                <div class="titleBodyy" @click="showLibrary = !showLibrary" v-if="isShowMenu">
                    <p class="subListTitle"  >{{ $t('sideBar.library') }}</p>
                    <img src="/arrow-down.png" class="icon" :style="showLibrary ? 'transform: rotate(180deg)' : ''">
                </div>

                <div class="subListItems" v-if="showLibrary">
                    <a class="subListItem" href="/" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 1 ? 'svg active' : 'svg'">
                            <circle cx="11" cy="11" r="8.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="11" cy="11" r="8.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.25 10.9998H13.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M8.25 10.9998H13.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 8.25V13.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M11 8.25V13.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="subListItemTitle" :class="active == 1 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.readers_cards') }}</span>
                    </a>
                    <a class="subListItem" href="/books" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 2 ? 'svg active' : 'svg'">
                            <path d="M17.4167 7.98428L12.5281 4.18195C11.6456 3.49534 10.4095 3.49534 9.52696 4.18195L4.63746 7.98428C4.042 8.44735 3.69386 9.15954 3.69421 9.91386V16.5139C3.69421 17.5264 4.51503 18.3472 5.52755 18.3472H16.5275C17.5401 18.3472 18.3609 17.5264 18.3609 16.5139V9.91386C18.3609 9.15945 18.0125 8.4472 17.4167 7.98428" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6667 13.7501C12.6409 14.972 9.35737 14.972 7.33337 13.7501" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span class="subListItemTitle" :class="active == 2 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.books') }}</span>
                    </a>

                    <a class="subListItem" href="/publishers" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 3 ? 'svg active' : 'svg'">
                            <ellipse cx="5.49996" cy="17.4168" rx="1.83333" ry="1.83333" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="5.49996" cy="17.4168" rx="1.83333" ry="1.83333" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="15.5833" cy="17.4168" rx="1.83333" ry="1.83333" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="15.5833" cy="17.4168" rx="1.83333" ry="1.83333" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.5833 15.5833H5.49996V2.75H3.66663" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.5833 15.5833H5.49996V2.75H3.66663" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.5 4.5835L18.3333 5.50016L17.4167 11.9168H5.5" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.5 4.5835L18.3333 5.50016L17.4167 11.9168H5.5" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <span class="subListItemTitle" :class="active == 3 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.publishers') }}</span>
                    </a>

                    <a class="subListItem" href="/categories" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 4 ? 'svg active' : 'svg'">
                            <ellipse cx="8.25004" cy="6.41667" rx="3.66667" ry="3.66667" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="8.25004" cy="6.41667" rx="3.66667" ry="3.66667" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.75 19.25V17.4167C2.75 15.3916 4.39162 13.75 6.41667 13.75H10.0833C12.1084 13.75 13.75 15.3916 13.75 17.4167V19.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.75 19.25V17.4167C2.75 15.3916 4.39162 13.75 6.41667 13.75H10.0833C12.1084 13.75 13.75 15.3916 13.75 17.4167V19.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6666 2.86914C16.289 3.28455 17.4238 4.74647 17.4238 6.42122C17.4238 8.09598 16.289 9.5579 14.6666 9.97331" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6666 2.86914C16.289 3.28455 17.4238 4.74647 17.4238 6.42122C17.4238 8.09598 16.289 9.5579 14.6666 9.97331" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.25 19.2497V17.4164C19.2404 15.7522 18.1113 14.3032 16.5 13.8872" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.25 19.2497V17.4164C19.2404 15.7522 18.1113 14.3032 16.5 13.8872" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <span class="subListItemTitle" :class="active == 4 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.categories') }}</span>
                    </a>

                    <a class="subListItem" href="/groups" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 5 ? 'svg active' : 'svg'">
                            <path d="M13.75 4.5835V6.41683" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 4.5835V6.41683" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 10.0835V11.9168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 10.0835V11.9168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 15.5835V17.4168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M13.75 15.5835V17.4168" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.58333 4.5835H17.4167C18.4292 4.5835 19.25 5.40431 19.25 6.41683V9.16683C18.2375 9.16683 17.4167 9.98764 17.4167 11.0002C17.4167 12.0127 18.2375 12.8335 19.25 12.8335V15.5835C19.25 16.596 18.4292 17.4168 17.4167 17.4168H4.58333C3.57081 17.4168 2.75 16.596 2.75 15.5835V12.8335C3.76252 12.8335 4.58333 12.0127 4.58333 11.0002C4.58333 9.98764 3.76252 9.16683 2.75 9.16683V6.41683C2.75 5.40431 3.57081 4.5835 4.58333 4.5835" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M4.58333 4.5835H17.4167C18.4292 4.5835 19.25 5.40431 19.25 6.41683V9.16683C18.2375 9.16683 17.4167 9.98764 17.4167 11.0002C17.4167 12.0127 18.2375 12.8335 19.25 12.8335V15.5835C19.25 16.596 18.4292 17.4168 17.4167 17.4168H4.58333C3.57081 17.4168 2.75 16.596 2.75 15.5835V12.8335C3.76252 12.8335 4.58333 12.0127 4.58333 11.0002C4.58333 9.98764 3.76252 9.16683 2.75 9.16683V6.41683C2.75 5.40431 3.57081 4.5835 4.58333 4.5835" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>


                        <span class="subListItemTitle" :class="active == 5 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.groups') }}</span>
                    </a>

                    <a class="subListItem" href="/authors" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 6 ? 'svg active' : 'svg'">
                            <ellipse cx="8.25004" cy="6.41667" rx="3.66667" ry="3.66667" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="8.25004" cy="6.41667" rx="3.66667" ry="3.66667" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.75 19.25V17.4167C2.75 15.3916 4.39162 13.75 6.41667 13.75H10.0833C12.1084 13.75 13.75 15.3916 13.75 17.4167V19.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M2.75 19.25V17.4167C2.75 15.3916 4.39162 13.75 6.41667 13.75H10.0833C12.1084 13.75 13.75 15.3916 13.75 17.4167V19.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6666 2.86914C16.289 3.28455 17.4238 4.74647 17.4238 6.42122C17.4238 8.09598 16.289 9.5579 14.6666 9.97331" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M14.6666 2.86914C16.289 3.28455 17.4238 4.74647 17.4238 6.42122C17.4238 8.09598 16.289 9.5579 14.6666 9.97331" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.25 19.2497V17.4164C19.2404 15.7522 18.1113 14.3032 16.5 13.8872" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19.25 19.2497V17.4164C19.2404 15.7522 18.1113 14.3032 16.5 13.8872" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span class="subListItemTitle" :class="active == 6 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.authors') }}</span>
                    </a>

                    <a class="subListItem" href="/availabilitys" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 7 ? 'svg active' : 'svg'">
                            <circle cx="11" cy="11" r="8.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="11" cy="11" r="8.25" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="11" cy="9.1665" rx="2.75" ry="2.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <ellipse cx="11" cy="9.1665" rx="2.75" ry="2.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.65393 17.2781C6.11982 15.7275 7.54754 14.666 9.1666 14.6665H12.8333C14.4545 14.6659 15.8837 15.7302 16.3478 17.2836" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.65393 17.2781C6.11982 15.7275 7.54754 14.666 9.1666 14.6665H12.8333C14.4545 14.6659 15.8837 15.7302 16.3478 17.2836" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span class="subListItemTitle" :class="active == 7 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.book_availability_report') }}</span>
                    </a>

                    <a class="subListItem" href="/movement" :style="!isShowMenu ? 'justify-content: center;' : ''">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" :class="active == 8 ? 'svg active' : 'svg'">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46458 3.95725C9.85508 2.34758 12.1449 2.34758 12.5354 3.95725C12.6543 4.44772 13.0002 4.85194 13.4664 5.0451C13.9327 5.23826 14.4631 5.19713 14.894 4.93442C16.3084 4.07275 17.9282 5.69158 17.0665 7.10692C16.8042 7.53762 16.7631 8.06766 16.9561 8.5336C17.149 8.99954 17.5527 9.34542 18.0428 9.46458C19.6524 9.85508 19.6524 12.1449 18.0428 12.5354C17.5523 12.6543 17.1481 13.0002 16.9549 13.4664C16.7617 13.9327 16.8029 14.4631 17.0656 14.894C17.9272 16.3084 16.3084 17.9282 14.8931 17.0665C14.4624 16.8042 13.9323 16.7631 13.4664 16.9561C13.0005 17.149 12.6546 17.5527 12.5354 18.0428C12.1449 19.6524 9.85508 19.6524 9.46458 18.0428C9.34574 17.5523 8.9998 17.1481 8.53357 16.9549C8.06734 16.7617 7.53689 16.8029 7.106 17.0656C5.69158 17.9272 4.07183 16.3084 4.9335 14.8931C5.19584 14.4624 5.23687 13.9323 5.04393 13.4664C4.851 13.0005 4.44727 12.6546 3.95725 12.5354C2.34758 12.1449 2.34758 9.85508 3.95725 9.46458C4.44772 9.34574 4.85194 8.9998 5.0451 8.53357C5.23826 8.06734 5.19713 7.53689 4.93442 7.106C4.07275 5.69158 5.69158 4.07183 7.10692 4.9335C8.02358 5.49083 9.21158 4.99767 9.46458 3.95725Z" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.46458 3.95725C9.85508 2.34758 12.1449 2.34758 12.5354 3.95725C12.6543 4.44772 13.0002 4.85194 13.4664 5.0451C13.9327 5.23826 14.4631 5.19713 14.894 4.93442C16.3084 4.07275 17.9282 5.69158 17.0665 7.10692C16.8042 7.53762 16.7631 8.06766 16.9561 8.5336C17.149 8.99954 17.5527 9.34542 18.0428 9.46458C19.6524 9.85508 19.6524 12.1449 18.0428 12.5354C17.5523 12.6543 17.1481 13.0002 16.9549 13.4664C16.7617 13.9327 16.8029 14.4631 17.0656 14.894C17.9272 16.3084 16.3084 17.9282 14.8931 17.0665C14.4624 16.8042 13.9323 16.7631 13.4664 16.9561C13.0005 17.149 12.6546 17.5527 12.5354 18.0428C12.1449 19.6524 9.85508 19.6524 9.46458 18.0428C9.34574 17.5523 8.9998 17.1481 8.53357 16.9549C8.06734 16.7617 7.53689 16.8029 7.106 17.0656C5.69158 17.9272 4.07183 16.3084 4.9335 14.8931C5.19584 14.4624 5.23687 13.9323 5.04393 13.4664C4.851 13.0005 4.44727 12.6546 3.95725 12.5354C2.34758 12.1449 2.34758 9.85508 3.95725 9.46458C4.44772 9.34574 4.85194 8.9998 5.0451 8.53357C5.23826 8.06734 5.19713 7.53689 4.93442 7.106C4.07275 5.69158 5.69158 4.07183 7.10692 4.9335C8.02358 5.49083 9.21158 4.99767 9.46458 3.95725Z" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="11" cy="11" r="2.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="11" cy="11" r="2.75" stroke="#8B909A" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span class="subListItemTitle" :class="active == 8 ? 'subListItemTitle active' : 'subListItemTitle'" v-if="isShowMenu">{{ $t('sideBar.book_movement_report') }}</span>
                    </a>
                </div>
            </div>


            <!-- <div class="subListItems">
                <p class="subListTitle" v-if="isShowMenu">Основное</p>

                
            </div> -->

            <!-- <div class="subListItems">
                <p class="subListTitle" v-if="isShowMenu">Отчеты</p>

               
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { Ref, ref, watch, onBeforeUnmount, onMounted } from 'vue'


const AuthStore = useAuthStore()

// console.log(AuthStore.isLoggedIn)
// console.log(AuthStore.getCurrentUserRoles)

let role: Ref<string | null> = ref(AuthStore.getCurrentUserRoles!)
const isShowMenu: Ref<boolean> = ref(false)

const windowWidth = ref(window.innerWidth);
const isMobile = ref(false)

const showMenu = () => {
    isShowMenu.value = true
}

const hideMenu = () => {
    isShowMenu.value = false
}

const menuStyle = {
  width: isShowMenu.value ? '15%' : '0'
}

const { active } = defineProps(['active']);

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth;
  isMobile.value = window.innerWidth < 1024; 
};

const showEats: Ref<boolean> = ref(false)
const showLibrary: Ref<boolean> = ref(false)

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowSize);
});

</script>

<style scoped>
.sidebar{
    overflow: hidden;
    width: 5%;
    position: fixed;
    padding: 30px 20px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    height: 100vh;
    background-color: #0C214A;
    transition: 0.3s;
    z-index: 10;
}
.mobileMenu{
        display: block;
        transition: 0.3s;
        cursor: pointer;
        background-color: #0C214A;
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 50px;
    }
.listItems{
    margin-top: 50px;
}
.subListItems{
    margin-bottom: 30px
}
.logo{
    font-family: "Goldman Regular";
    color: #0F60FF;
    margin: 0;
    display: flex;
    justify-content: center;
}
.logoImg{
    width: 70%;
}
.subListTitle{
    color: white;
    font-size: 16px;
    margin: 0 0 10px 0;
    transition: 0.3s;

}
.subListItem{
    color: #8B909A;
    display: flex;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    margin-bottom: 5px;
    box-sizing: border-box;
    transition: 0.3s;
    text-decoration: none;
    overflow: hidden;
}
.subListItemTitle{
    font-size: 16px;
    font-weight: 400;
    margin-left: 10px;
    white-space: nowrap; 
    overflow: hidden;
}
.subListItem:hover .subListItemTitle{
    color: #fff;
}
.svg > *{
    overflow: hidden;
    transition: 0.3s;
}
.subListItem:hover .svg > *{
    stroke: #fff;
}
.subListItem:hover{
    background: #0165E1;
}
.active{
    color: #fff;
    stroke: #fff;
}
.active > * {
    stroke: #fff;
}
.titleBodyy{
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    cursor: pointer;
}
.icon{
    height: 16px;
    transition: 0.3;
}

@media screen and (max-width: 1023px) {
    
    .sidebar{
        transition: 0.3s;
        width: 0;
        overflow: hidden;
        z-index: 10;
    }
}
</style>