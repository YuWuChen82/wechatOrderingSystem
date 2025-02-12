<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="listParm" :inline="true" size="default">
            <el-form-item label="">
                <el-input v-model="listParm.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">搜索</el-button>
                <el-button :icon="Close" plain type="danger" @click="resetBtn">重置</el-button>
                <el-button :icon="Plus" type="primary" @click="addBtn">新增</el-button>

            </el-form-item>
        </el-form>
        <!--  表格 -->
        <el-table :data="tableList" :height="tableHeight" border stripe>
            <el-table-column label="广告图片" prop="images">
                <template #default="scope">
                    <el-image :src="scope.row.images.split(',')[0]"
                        style="height: 60px;width: 60px;border-radius: 50%;"></el-image>

                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题"></el-table-column>
            <el-table-column label="是否上架" prop="status">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="danger" size="default" effect="light">否</el-tag>
                    <el-tag v-else size="default" effect="light">是</el-tag>

                </template>
            </el-table-column>
            <el-table-column prop="orderNum" label="序号"></el-table-column>
            <el-table-column label="操作" width="220" align="center">
                <template #default="scope">
                    <el-button :icon="Edit" type="primary" size="default" @click="editBtn(scope.row)">
                        编辑
                    </el-button>

                    <el-button :icon="Delete" type="danger" size="default" @click="deleteBtn(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange"
            :current-page.sync="listParm.currentPage" :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="listParm.total" background>
            >
        </el-pagination>

    </el-main>
    <!-- 编辑弹框 -->
    <AddBanner ref="addRef" @onFresh="getList">

    </AddBanner>

</template>

<script setup lang="ts">
import AddBanner from './AddBanner.vue';
import useBannerTable from '@/composables/banner/useBannerTable';
import useBanner from '@/composables/banner/useBanner';
import { Edit, Plus, Delete, Search, Close } from '@element-plus/icons-vue'
//表格相关的操作
const { listParm, getList, searchBtn, resetBtn, tableList, sizeChange, currentChange, tableHeight } = useBannerTable();
//增删改
const { addBtn, editBtn, deleteBtn, addRef } = useBanner(getList);
console.log(tableList);
</script>

<style scoped></style>