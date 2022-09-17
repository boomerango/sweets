const product=
{
    template:`
<h3> Products list</h3>
<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add Product
</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Product ID
        </th>  
        <th>
            Product Name
        </th>
        <th>
        Options
        </th>
    </tr>
</thead>
<tbody>
<tr v-for="dep in products">
<td>{{dep.ProductID}}</td>
<td>{{dep.ProductName}}</td>
<td>
    <button type="button"
    class="btn btn-light mr-1"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="editClick(dep)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
    </button>
    <button type="button" @click="deleteClick(dep.ProductID)"
    class="btn btn-light mr-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
    </button>
</td>
</tr>
</tbody>
</table>

<div class="modal fade" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
<div class="modal-dialog modal-lg modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
    </div>
    <div class="modal-body">
     <div class="d-flex flex-row bd-highlight mb-3">
     <div class="p-2 w-50 bd-highlight">

        <div class="input-group mb-3">
            <span class="input-group-text">Product Name</span>
            <input type="text" class="form-control" v-model="ProductName">
        </div>
        <div class="input-group mb-3">
        <span class="input-group-text">Product Type</span>
        <input type="text" class="form-control" v-model="ProductType">
        </div>
        <div class="input-group mb-3">
        <span class="input-group-text">ProductDescription</span>
        <input type="text" class="form-control" v-model="ProductDescription">
        </div>

        <div class="input-group mb-3">
        <span class="input-group-text">ProductPortions</span>
        <input type="text" class="form-control" v-model="ProductPortions">
        </div>

        <div class="input-group mb-3">
        <span class="input-group-text">ProductPrice</span>
        <input type="text" class="form-control" v-model="ProductPrice">
        </div>

        <div class="input-group mb-3">
        <span class="input-group-text">ProductWeight</span>
        <input type="text" class="form-control" v-model="ProductWeight">
        </div>

    </div>
        <div class="p-2 w-50 bd-highlight">

        <img width="250" height="250"
            :src="PhotoPath+ProductPhotoLink"/>

        <input class="m-2" type="file" @change="imageUpload">
        </div>
     </div>
        <button type="button" @click="createClick()"
        v-if="ProductID==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="ProductID!=0" class="btn btn-primary">
        Update
        </button>
    </div>
</div>
</div>
</div>
`,
data(){
    return{
        products:[],
        modalTitle:"",
        ProductName:"",
        ProductID:0,
        DepartmentNameFilter:"",
        DepartmentIdFilter:"",
        departmentsWithoutFilter:[],
        tempFields:undefined,
        ProductPhotoLink:"anonymus.png",
        PhotoPath:variables.PHOTO_URL,
        ProductWeight:0,
        ProductType:"",
        ProductPrice:0,
        ProductPortions:0,
        ProductDescription:""

    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"products")
        .then((response)=>{
            this.products=response.data;
            this.departmentsWithoutFilter=response.data;
        });
    },
    addClick(){
        this.modalTitle="Add Product";
        this.ProductID=0;
        this.ProductName="";
        this.ProductPhotoLink="anonymus.png"
        this.ProductWeight=0,
        this.ProductType="",
        this.ProductPrice=0,
        this.ProductPortions=0,
        this.ProductDescription=""
    },
    editClick(dep){
        this.tempFields = dep;
        this.modalTitle="Edit Product";
        this.ProductID=dep.ProductID;
        this.ProductName=dep.ProductName;
        this.ProductPhotoLink=dep.ProductPhotoLink,
        this.ProductWeight=0,
        this.ProductType="",
        this.ProductPrice=0,
        this.ProductPortions=0,
        this.ProductDescription=""
    },
    createClick(){
        axios.post(variables.API_URL+"products",{
            ProductID:null,
            ProductName:this.ProductName,
            ProductPhotoLink:this.ProductPhotoLink,
            ProductWeight:this.ProductWeight,
            ProductType: this.ProductType,
            ProductPrice: this.ProductPrice,
            ProductPortions: this.ProductPortions,
            ProductDescription: this.ProductDescription
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        this.tempFields.ProductID =this.ProductID,
        this.tempFields.ProductName =this.ProductName,
        this.tempFields.ProductPhotoLink=this.ProductPhotoLink,
        this.tempFields.ProductWeight=this.ProductWeight,
        this.tempFields.ProductType=this.ProductType,
        this.tempFields.ProductPrice= this.ProductPrice,
        this.tempFields.ProductPortions=this.ProductPortions,
        this.tempFields.ProductDescription=this.ProductDescription
        axios.put(variables.API_URL+"products",this.tempFields
        // {
        //     ProductID:this.ProductID,
        //     ProductName:this.ProductName
        // }
        )
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"products/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    FilterFn(){
        var DepartmentIdFilter=this.DepartmentIdFilter;
        var DepartmentNameFilter=this.DepartmentNameFilter;

        this.products=this.departmentsWithoutFilter.filter(
            function(el){
                return el.ProductID.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                )&&
                el.ProductName.toString().toLowerCase().includes(
                    DepartmentNameFilter.toString().trim().toLowerCase()
                )
            });
    },
    sortResult(prop,asc){
        this.products=this.departmentsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    },
    imageUpload(event){
        let formData=new FormData();
        formData.append('file',event.target.files[0]);
        axios.post(
            variables.API_URL+"product/savefile",
            formData)
            .then((response)=>{
                this.ProductPhotoLink=response.data;
            });
    }
},
mounted:function(){
    this.refreshData();
}
}

