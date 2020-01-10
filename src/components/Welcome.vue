<template>
<div>
    <h3>Welcome</h3>
    <div>hello</div>
    <el-button type="primary" @click="getData">测试</el-button>
</div>
</template>

<script>
export default {
    methods:{
        async getData(){
            const {data:res} = await this.$http.request({
                 url: 'http://localhost:3000/getData',
                 method: 'get',
                 headers: {Authorization:'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iua6kOeggeaXtuS7oyIsInBhc3N3b3JkIjoiaXRzb3VyY2UuY24iLCJyb2xlIjoi566h55CG5ZGYIiwibWFqb3IiOiJKYXZhIiwic3RhdHVzIjoi5Zyo6IGMIiwiaWF0IjoxNTc3ODYxNDU4LCJleHAiOjE1Nzc4OTc0NTh9.dYUyX8uC_EIR9mQCqEAxUJNSrcqxltBINZDSTxOicQo'}
            })
            console.log(res);
        }
    }
}
</script>