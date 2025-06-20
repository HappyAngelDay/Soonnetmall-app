<template>
    <div class="pay-header">
        <div class="cvs-pay-title">
            <i class="fa fa-check-circle" aria-hidden="true" style="padding-right: 10px;"></i>
            超商代碼
        </div>
        <span class="cvs-pay-icons">
            <img src="https://ecpg.ecpay.com.tw/Content/images/ok-mart.svg" alt="OK" class="cvs-icon" />
            <img src="https://ecpg.ecpay.com.tw/Content/images/7-11.svg" alt="7-11" class="cvs-icon" />
            <img src="https://ecpg.ecpay.com.tw/Content/images/hi-life.svg" alt="Hi-Life" class="cvs-icon" />
            <img src="https://ecpg.ecpay.com.tw/Content/images/family-mart-logo.svg" alt="FamilyMart"
                class="cvs-icon" />
        </span>
    </div>
    <div class="cvs-pay-content">
        <div class="cvs-pay-desc">
            請至超商機台輸入代碼，產生繳費單後前往櫃台繳費。
        </div>
        <div class="cvs-pay-note">
            <span style="color:#1987e4;cursor:pointer;">注意事項</span><br>
            請於 <span style="color:#e00;">7天內</span> 至超商列印繳費單並完成繳費。
        </div>
    </div>
</template>
<script setup>
// 無需 props
</script>
<style scoped>


.cvs-pay-title {
    font-size: 18px;
    font-weight: bold;
    color: #222;
    display: flex;
    align-items: center;
}

.cvs-pay-icons {
    display: flex;
    gap: 4px;
}

.cvs-icon {
    width: 12px;
    height: 12px;
    object-fit: contain;
    background: #fff;
    border-radius: 4px;
    border: 1px solid #eee;
    padding: 2px;
}

.cvs-pay-content {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 1.2rem;
    padding: 20px 16px;
    border-radius: 0 0 12px 12px;
    border: 1px solid #e0e0e0;
}

.cvs-pay-desc {
    margin-bottom: 8px;
}

.cvs-pay-note {
    font-size: 13px;
    text-align: left;
    border-radius: 6px;
    color: #1987e4
}

.cvs-pay-btn {
    margin-top: 18px;
    background: #32A45D;
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 12px 0;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
}

.cvs-pay-btn:hover {
    background: #26994b;
}
</style>
