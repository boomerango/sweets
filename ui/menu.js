const menu=
{
    template:`
<h3> Items list</h3>
<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Add item
</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Item ID
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
<td>{{dep.IdOfPiece}}</td>
<td>{{dep.IDOfSweet}}</td>
<td>{{dep.DateOfManufacture}}</td>
<td>{{dep.DateOfExpiration}}</td>
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
    <button type="button" @click="deleteClick(dep.IdOfPiece)"
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
            <span class="input-group-text">Product name</span>
            <input type="text" class="form-control" v-model="IDOfSweet">
        </div>
        <div class="input-group mb-3">
        <span class="input-group-text">Date Of Manufacture</span>
        <input type="text" class="form-control" v-model="DateOfManufacture">
        </div>
        <div class="input-group mb-3">
        <span class="input-group-text">Date Of Expiration</span>
        <input type="text" class="form-control" v-model="DateOfExpiration">
        </div>


        <button type="button" @click="createClick()"
        v-if="IdOfPiece==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="IdOfPiece!=0" class="btn btn-primary">
        Update
        </button>
    </div>
</div>
</div>
</div>
`,
data(){
    return{
        list:[],
        products:[],
        modalTitle:"",
        ProductName:"",
        ProductID:0,
        DepartmentNameFilter:"",
        DepartmentIdFilter:"",
        departmentsWithoutFilter:[],
        tempFields:undefined,
        IDOfSweet:0,
        IdOfPiece :0,
        DateOfManufacture :null,
        DateOfExpiration :null
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"list")
        .then((response)=>{
            this.products=response.data;
            this.departmentsWithoutFilter=response.data;
        });
    },
    addClick(){
        this.modalTitle="Add Item";
        this.DateOfManufacture =null;
        this.DateOfExpiration =null;
        this.IDOfSweet=0;
    },
    editClick(dep){
        this.tempFields = dep;
        this.modalTitle="Edit Item";
        this.IdOfPiece = dep.IdOfPiece;
        this.DateOfManufacture=dep.DateOfManufacture;
        this.DateOfExpiration=dep.DateOfExpiration;
        this.IDOfSweet=dep.IDOfSweet;
    },
    createClick(){
        axios.post(variables.API_URL+"list",{
        DateOfManufacture: this.DateOfManufacture,
        DateOfExpiration: this.DateOfExpiration,
        IDOfSweet: this.IDOfSweet
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        this.tempFields.DateOfManufacture =this.DateOfManufacture,
        this.tempFields.DateOfExpiration =this.DateOfExpiration,
        this.tempFields.IDOfSweet=this.IDOfSweet,
        this.tempFields.IdOfPiece=this.IdOfPiece
        axios.put(variables.API_URL+"list",this.tempFields
        )
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        }).
       catch(e=>alert(e.message));
    },
    deleteClick(id){
        if(!confirm("Are you sure?")){
            return;
        }
        axios.delete(variables.API_URL+"tlist/"+id)
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
    }
},
mounted:function(){
    this.refreshData();
}
}

