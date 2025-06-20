<template>

    <f7-list strong-ios outline-ios>
        <f7-list-input
            type="datepicker"
            placeholder="選擇日期"
            readonly
            :calendar-params="calendarParams"
        />
    </f7-list>

</template>

<script setup>
const calendarParams = {
    locale: {
        months: [
            '一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'
        ],
        monthsShort: [
            '1月', '2月', '3月', '4月', '5月', '6月',
            '7月', '8月', '9月', '10月', '11月', '12月'
        ],
        firstDay: 1,
        weekdays: [
            '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'
        ],
        weekdaysShort: ['日', '一', '二', '三', '四', '五', '六']
    },
    dateFormat: 'yyyy/mm/dd',
    closeOnSelect: true,
    openIn: 'sheet',
    sheetPush: true,
    header: true,
    footer: true
}
</script>

<style scoped>
/* ...existing code... */
</style>