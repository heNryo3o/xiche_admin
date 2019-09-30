<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body {
    font-size: 14px;
  }

  .filter-container {
    margin-bottom: 15px;
  }

  .table-container .el-table th,
  .table-container .el-table td {
    text-align: center;
    min-width: 120px;
    padding: 8px 0;
  }

  .link-type {
    cursor: pointer;
    color: #409eff;
    font-weight: 600;
  }

  .cursor-type {
    cursor: pointer;
  }

  .button-group {
    text-align: center;
  }

  .tags-in-table {
    margin-left: 10px;
  }

  .mb-20 {
    margin-bottom: 20px;
  }

  .mb-30 {
    margin-bottom: 30px;
  }

  .mb-10 {
    margin-bottom: 10px;
  }

  .radius-15 {
    border-radius: 15px;
  }

  .info-label {
    color: #606266;
  }

  .success-color {
    color: #67C23A;
  }

  .danger-color {
    color: #F56C6C;
  }

  .full-width {
    width: 100%;
  }

  .table-image {
    width: 70px;
    height: 70px;
    border-radius: 10px;
  }
</style>
