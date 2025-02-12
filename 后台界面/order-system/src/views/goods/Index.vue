<template>
    <el-main>
        <!-- 搜索栏 -->
        <el-form :model="listParm" :inline="true" size="default">
            <el-form-item>
                <el-input v-model="listParm.goodsName" placeholder="请输入菜品名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">搜索</el-button>
                <el-button type="danger" plain :icon="Close" @click="resetBtn">重置</el-button>
                <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>

            </el-form-item>
        </el-form>
        <!-- 表格
        1.主子表的关键：父表需要设置 row-key字段
        2.设置type = 'expand'
        -->
        <el-table row-key="goodsId" :height="tableHeight" :data="tableList" border stripe>
            <el-table-column type="expand">
                <template #default="row">
                    <el-table :data="row.row.specs" border stripe>
                        <el-table-column label="名称" prop="specsName">
                        </el-table-column>
                        <el-table-column label="价格" prop="goodsPrice">
                        </el-table-column>
                        <el-table-column label="序号" prop="orderNum">
                        </el-table-column>
                    </el-table>

                </template>
            </el-table-column>

            <el-table-column label="菜品图片" prop="goodsImage">
                <template #default="scope">
                    <el-image :src="scope.row.goodsImage.split(',')[0]"
                        style="height: 60px;width: 60px;border-radius: 50%;"></el-image>

                </template>
            </el-table-column>
            <el-table-column label="菜品名称" prop="goodsName"></el-table-column>
            <el-table-column label="菜品单位" prop="goodsUnit"></el-table-column>
            <el-table-column label="菜品序号" prop="orderNum"></el-table-column>
            <el-table-column label="是否热推" prop="status">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == 0" type="danger" size="default" effect="light">否</el-tag>
                    <el-tag v-else size="default" effect="light">是</el-tag>

                </template>
            </el-table-column>
            <el-table-column label="操作" width="200" align="center">
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
            :pager-count="7">
        </el-pagination>

    </el-main>
    <!-- 新增编辑 -->
    <AddGoods ref="addRef" @onFresh="getList"></AddGoods>
</template>

<script setup lang="ts">
import AddGoods from '@/views/goods/AddGoods.vue'
import useGoodsTable from '@/composables/goods/useGoodsTable'
import useGoods from '@/composables/goods/useGoods'
import { Search, Close, Plus, Edit, Delete } from '@element-plus/icons-vue'

// 表格业务
const { listParm, getList, searchBtn, resetBtn, tableList, sizeChange, currentChange, tableHeight } = useGoodsTable()
// 新增业务
const { addBtn, deleteBtn, editBtn, addRef } = useGoods(getList)
</script>

<style scoped></style>