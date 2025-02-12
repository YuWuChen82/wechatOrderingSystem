<template>
    <el-main>
        <!--  表格 -->
        <el-table :data="tableList" :height="tableHeight" border stripe>
            <el-table-column label="商品信息">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <el-image :src="scope.row.goodsImage.split(',')[0]"
                            style="height: 60px; width: 60px; border-radius: 50%;"></el-image>
                        <span style="margin-left: 10px;">{{ scope.row.goodsName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="用户信息">
                <template #default="scope">
                    <div style="display: flex; align-items: center;">
                        <el-image :src="ImgBaseUrl + scope.row.avatarUrl"
                            style="height: 60px; width: 60px; border-radius: 50%;"></el-image>
                        <span style="margin-left: 10px;">{{ scope.row.nickName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="评论" prop="commentText"></el-table-column>
            <el-table-column label="时间" prop="createTime"></el-table-column>
            <el-table-column label="操作" width="220" align="center">
                <template #default="scope">
                    <el-button :icon="Delete" type="danger" size="default"
                        @click="deleteBtn(scope.row.commentId)">删除</el-button>
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


</template>

<script setup lang="ts">
import useCommentTable from '@/composables/comment/useCommentTable';
import { Delete } from '@element-plus/icons-vue'
//表格相关的操作
const { listParm, tableList, sizeChange, currentChange, tableHeight, deleteBtn } = useCommentTable();
const ImgBaseUrl = process.env.BASE_API;
console.log(tableList);
</script>

<style scoped></style>