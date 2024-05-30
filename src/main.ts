import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n.js";
import { pinia, usePinia } from "./stores";
import Toast, { PluginOptions, POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useAppStore } from "./stores/appStore";
import { useLocaleStore } from './stores/localeStore';
import { useAuthStore } from "@/stores/authStore"
import PrimeVue, { PrimeVueConfiguration } from 'primevue/config';

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';


export { i18n };

const options: PluginOptions = {
  position: POSITION.TOP_CENTER,
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

const app = createApp(App)
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(PrimeVue, {
    locale: {
      accept: i18n.global.t('primevue.accept'),
      addRule: i18n.global.t('primevue.addRule'),
      am: i18n.global.t('primevue.am'),
      apply: i18n.global.t('primevue.apply'),
      cancel: i18n.global.t('primevue.cancel'),
      choose: i18n.global.t('primevue.choose'),
      chooseDate: i18n.global.t('primevue.chooseDate'),
      chooseMonth: i18n.global.t('primevue.chooseMonth'),
      chooseYear: i18n.global.t('primevue.chooseYear'),
      clear: i18n.global.t('primevue.clear'),
      completed: i18n.global.t('primevue.completed'),
      contains: i18n.global.t('primevue.contains'),
      custom: i18n.global.t('primevue.custom'),
      dateAfter: i18n.global.t('primevue.dateAfter'),
      dateBefore: i18n.global.t('primevue.dateBefore'),
      dateFormat: i18n.global.t('primevue.dateFormat'),
      dateIs: i18n.global.t('primevue.dateIs'),
      dateIsNot: i18n.global.t('primevue.dateIsNot'),
      dayNames: [
        i18n.global.locale.value == "ru" ? "Воскресенье" : "Жексенбі",
        i18n.global.locale.value == "ru" ? "Понедельник" : "Дүйсенбі",
        i18n.global.locale.value == "ru" ? "Вторник" : "Сейсенбі",
        i18n.global.locale.value == "ru" ? "Среда" : "Сәрсенбі",
        i18n.global.locale.value == "ru" ? "Четверг" : "Бейсенбі",
        i18n.global.locale.value == "ru" ? "Пятница" : "Жұма",
        i18n.global.locale.value == "ru" ? "Суббота" : "Сенбі"
      ],
      dayNamesMin: [
        i18n.global.locale.value == "ru" ? "Вс" : "Жс",
        i18n.global.locale.value == "ru" ? "Пн" : "Дс",
        i18n.global.locale.value == "ru" ? "Вт" : "Сс",
        i18n.global.locale.value == "ru" ? "Ср" : "Ср",
        i18n.global.locale.value == "ru" ? "Чт" : "Бс",
        i18n.global.locale.value == "ru" ? "Пт" : "Жм",
        i18n.global.locale.value == "ru" ? "Сб" : "Сб"
      ],
      dayNamesShort: [
        i18n.global.locale.value == "ru" ? "Вск" : "Жек",
        i18n.global.locale.value == "ru" ? "Пнд" : "Дүй",
        i18n.global.locale.value == "ru" ? "Втр" : "Сей",
        i18n.global.locale.value == "ru" ? "Срд" : "Сәр",
        i18n.global.locale.value == "ru" ? "Чтв" : "Бей",
        i18n.global.locale.value == "ru" ? "Птн" : "Жұм",
        i18n.global.locale.value == "ru" ? "Сбт" : "Сен"
      ],
      emptyFilterMessage: i18n.global.t('primevue.emptyFilterMessage'),
      emptyMessage: i18n.global.t('primevue.emptyMessage'),
      emptySearchMessage: i18n.global.t('primevue.emptySearchMessage'),
      emptySelectionMessage: i18n.global.t('primevue.emptySelectionMessage'),
      endsWith: i18n.global.t('primevue.endsWith'),
      equals: i18n.global.t('primevue.equals'),
      fileSizeTypes: [
        i18n.global.t('primevue.fileSizeTypes')[0],
        i18n.global.t('primevue.fileSizeTypes')[1],
        i18n.global.t('primevue.fileSizeTypes')[2],
        i18n.global.t('primevue.fileSizeTypes')[3],
        i18n.global.t('primevue.fileSizeTypes')[4],
        i18n.global.t('primevue.fileSizeTypes')[5],
        i18n.global.t('primevue.fileSizeTypes')[6],
        i18n.global.t('primevue.fileSizeTypes')[7],
        i18n.global.t('primevue.fileSizeTypes')[8]
      ],
      filter: i18n.global.t('primevue.filter'),
      firstDayOfWeek: i18n.global.t('primevue.firstDayOfWeek'),
      gt: i18n.global.t('primevue.gt'),
      gte: i18n.global.t('primevue.gte'),
      lt: i18n.global.t('primevue.lt'),
      lte: i18n.global.t('primevue.lte'),
      matchAll: i18n.global.t('primevue.matchAll'),
      matchAny: i18n.global.t('primevue.matchAny'),
      medium: i18n.global.t('primevue.medium'),
      monthNames: [
        i18n.global.locale.value == "ru" ? "Январь" : "Қаңтар",
        i18n.global.locale.value == "ru" ? "Февраль" : "Ақпан",
        i18n.global.locale.value == "ru" ? "Март" : "Наурыз",
        i18n.global.locale.value == "ru" ? "Апрель" : "Сәуір",
        i18n.global.locale.value == "ru" ? "Май" : "Мамыр",
        i18n.global.locale.value == "ru" ? "Июнь" : "Маусым",
        i18n.global.locale.value == "ru" ? "Июль" : "Шілде",
        i18n.global.locale.value == "ru" ? "Август" : "Тамыз",
        i18n.global.locale.value == "ru" ? "Сентябрь" : "Қыркүйек",
        i18n.global.locale.value == "ru" ? "Октябрь" : "Қазан",
        i18n.global.locale.value == "ru" ? "Ноябрь" : "Қараша",
        i18n.global.locale.value == "ru" ? "Декабрь" : "Желтоқсан",
      ],
      monthNamesShort: [
        i18n.global.locale.value == "ru" ? "Янв" : "Қаң",
        i18n.global.locale.value == "ru" ? "Фев" : "Ақп",
        i18n.global.locale.value == "ru" ? "Мар" : "Нау",
        i18n.global.locale.value == "ru" ? "Апр" : "Сәу",
        i18n.global.locale.value == "ru" ? "Май" : "Мам",
        i18n.global.locale.value == "ru" ? "Июн" : "Мау",
        i18n.global.locale.value == "ru" ? "Июл" : "Шіл",
        i18n.global.locale.value == "ru" ? "Авг" : "Там",
        i18n.global.locale.value == "ru" ? "Сен" : "Қыр",
        i18n.global.locale.value == "ru" ? "Окт" : "Қаз",
        i18n.global.locale.value == "ru" ? "Ноя" : "Қар",
        i18n.global.locale.value == "ru" ? "Дек" : "Жел",
      ],
      nextDecade: i18n.global.t('primevue.nextDecade'),
      nextHour: i18n.global.t('primevue.nextHour'),
      nextMinute: i18n.global.t('primevue.nextMinute'),
      nextMonth: i18n.global.t('primevue.nextMonth'),
      nextSecond: i18n.global.t('primevue.nextSecond'),
      nextYear: i18n.global.t('primevue.nextYear'),
      noFilter: i18n.global.t('primevue.noFilter'),
      notContains: i18n.global.t('primevue.notContains'),
      notEquals: i18n.global.t('primevue.notEquals'),
      now: i18n.global.t('primevue.now'),
      passwordPrompt: i18n.global.t('primevue.passwordPrompt'),
      pending: i18n.global.t('primevue.pending'),
      pm: i18n.global.t('primevue.pm'),
      prevDecade: i18n.global.t('primevue.prevDecade'),
      prevHour: i18n.global.t('primevue.prevHour'),
      prevMinute: i18n.global.t('primevue.prevMinute'),
      prevMonth: i18n.global.t('primevue.prevMonth'),
      prevSecond: i18n.global.t('primevue.prevSecond'),
      prevYear: i18n.global.t('primevue.prevYear'),
      reject: i18n.global.t('primevue.reject'),
      removeRule: i18n.global.t('primevue.removeRule'),
      searchMessage: i18n.global.t('primevue.searchMessage'),
      selectionMessage: i18n.global.t('primevue.selectionMessage'),
      showMonthAfterYear: i18n.global.t('primevue.showMonthAfterYear'),
      startsWith: i18n.global.t('primevue.startsWith'),
      strong: i18n.global.t('primevue.strong'),
      today: i18n.global.t('primevue.today'),
      upload: i18n.global.t('primevue.upload'),
      weak: i18n.global.t('primevue.weak'),
      weekHeader: i18n.global.t('primevue.weekHeader'),
      aria: {
        cancelEdit: i18n.global.t('primevue.aria.cancelEdit'),
        close: i18n.global.t('primevue.aria.close'),
        collapseLabel: i18n.global.t('primevue.aria.collapseLabel'),
        collapseRow: i18n.global.t('primevue.aria.collapseRow'),
        editRow: i18n.global.t('primevue.aria.editRow'),
        expandLabel: i18n.global.t('primevue.aria.expandLabel'),
        expandRow: i18n.global.t('primevue.aria.expandRow'),
        falseLabel: i18n.global.t('primevue.aria.falseLabel'),
        filterConstraint: i18n.global.t('primevue.aria.filterConstraint'),
        filterOperator: i18n.global.t('primevue.aria.filterOperator'),
        firstPageLabel: i18n.global.t('primevue.aria.firstPageLabel'),
        gridView: i18n.global.t('primevue.aria.gridView'),
        hideFilterMenu: i18n.global.t('primevue.aria.hideFilterMenu'),
        jumpToPageDropdownLabel: i18n.global.t('primevue.aria.jumpToPageDropdownLabel'),
        jumpToPageInputLabel: i18n.global.t('primevue.aria.jumpToPageInputLabel'),
        lastPageLabel: i18n.global.t('primevue.aria.lastPageLabel'),
        listView: i18n.global.t('primevue.aria.listView'),
        moveAllToSource: i18n.global.t('primevue.aria.moveAllToSource'),
        moveAllToTarget: i18n.global.t('primevue.aria.moveAllToTarget'),
        moveBottom: i18n.global.t('primevue.aria.moveBottom'),
        moveDown: i18n.global.t('primevue.aria.moveDown'),
        moveTop: i18n.global.t('primevue.aria.moveTop'),
        moveToSource: i18n.global.t('primevue.aria.moveToSource'),
        moveToTarget: i18n.global.t('primevue.aria.moveToTarget'),
        moveUp: i18n.global.t('primevue.aria.moveUp'),
        navigation: i18n.global.t('primevue.aria.navigation'),
        next: i18n.global.t('primevue.aria.next'),
        nextPageLabel: i18n.global.t('primevue.aria.nextPageLabel'),
        nullLabel: i18n.global.t('primevue.aria.nullLabel'),
        otpLabel: i18n.global.t('primevue.aria.otpLabel'),
        pageLabel: i18n.global.t('primevue.aria.pageLabel'),
        passwordHide: i18n.global.t('primevue.aria.passwordHide'),
        passwordShow: i18n.global.t('primevue.aria.passwordShow'),
        previous: i18n.global.t('primevue.aria.previous'),
        previousPageLabel: i18n.global.t('primevue.aria.previousPageLabel'),
        rotateLeft: i18n.global.t('primevue.aria.rotateLeft'),
        rotateRight: i18n.global.t('primevue.aria.rotateRight'),
        rowsPerPageLabel: i18n.global.t('primevue.aria.rowsPerPageLabel'),
        saveEdit: i18n.global.t('primevue.aria.saveEdit'),
        scrollTop: i18n.global.t('primevue.aria.scrollTop'),
        selectAll: i18n.global.t('primevue.aria.selectAll'),
        selectLabel: i18n.global.t('primevue.aria.selectLabel'),
        selectRow: i18n.global.t('primevue.aria.selectRow'),
        showFilterMenu: i18n.global.t('primevue.aria.showFilterMenu'),
        slide: i18n.global.t('primevue.aria.slide'),
        slideNumber: i18n.global.t('primevue.aria.slideNumber'),
        star: i18n.global.t('primevue.aria.star'),
        stars: i18n.global.t('primevue.aria.stars'),
        trueLabel: i18n.global.t('primevue.aria.trueLabel'),
        unselectAll: i18n.global.t('primevue.aria.unselectAll'),
        unselectLabel: i18n.global.t('primevue.aria.unselectLabel'),
        unselectRow: i18n.global.t('primevue.aria.unselectRow'),
        zoomImage: i18n.global.t('primevue.aria.zoomImage'),
        zoomIn: i18n.global.t('primevue.aria.zoomIn'),
        zoomOut: i18n.global.t('primevue.aria.zoomOut'),
      }
    }})
  .use(Toast, options)

  .mount("#app");



const appStore = useAppStore();
const authStore = useAuthStore()
appStore.initialize();
authStore.authInitialize()