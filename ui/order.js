const order = {
template:`
<h3> This is order </h3>
<button type="button"
class="btn btn-primary m-2 fload-end"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="addClick()">
 Place an Order
</button>
<table class="table table-striped">
<thead>
    <tr>
        <th>
            Order ID
        </th>
        <th>
            Customer
        </th>
         <th>
            Order status
        </th>
        <th>
        Price
        </th>
        <th>
        Options
        </th>
    </tr>
</thead>
<tbody>
<tr v-for="dep in orders">
<td>{{dep.OrderId}}</td>
<td>{{dep.Customer}}</td>
<td>{{dep.OrderStatus}}</td>
<td></td>
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
    <button type="button" @click="deleteClick(dep.OrderId)"
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
            <span class="input-group-text">Customer</span>
            <input type="text" class="form-control" v-model="Customer">
        </div>
        <div class="input-group mb-3">
        <span class="input-group-text">Order Status Type</span>
        <input type="text" class="form-control" v-model="OrderStatus">
        </div>

        <div class="input-group mb-3">
        <span class="input-group-text">List Of Orders</span>
        <select class="form-select"  type="number" class="form-control" v-model="ListOfOrders">
                <option v-for="[key, value] in listsMap" :value="value.productID"> {{value.ProductName}}  exp at {{value.expires}}</option>
        </select>
        </div>

        <div class="input-group mb-3">
        <span class="input-group-text">Product</span>
        <select class="form-select" aria-label="Default select example" v-model="IDOfSweet">
            <option v-for="[key, value] in productsMap" :value="key"> {{value}} </option>
        </select>
        </div>

        <div class="input-group mb-3">
        <span class="input-group-text">amount</span>
        <input type="number" class="form-control" v-model="NumberOfSweets">
        </div>

        <div>
        <div class="input-group" @click="createClick()" v-if="OrderId==0">
             <span class="input-group-text">Price $</span>
            <span class="input-group-text"> {{0 || this.totalPrice}}</span>
        </div>
         <div class="input-group" @click="updateClick()" v-if="OrderId!=0">
             <span class="input-group-text" >Price $</span>
            <span class="input-group-text"> {{this.Price}}</span>
        </div>
        </div>

    </div>

     </div>
        <button type="button" @click="createClick()"
        v-if="OrderId==0" class="btn btn-primary">
        Create
        </button>
        <button type="button" @click="updateClick()"
        v-if="OrderId!=0" class="btn btn-primary">
        Update
        </button>
    </div>
</div>
</div>
</div>
`,
data(){
    return{
        orders:[],
        products:[],
        lists:[],
        listsMap:new Map(),
        productsMap:new Map(),
        modalTitle:"",
        Customer:"",
        OrderId:0,
        DepartmentNameFilter:"",
        DepartmentIdFilter:"",
        departmentsWithoutFilter:[],
        tempFields:undefined,
        ProductPhotoLink:"anonymus.png",
        PhotoPath:variables.PHOTO_URL,
        OrderStatus:"",
        ListOfOrders:"",
        NumberOfSweets:"",
        IDOfSweet:null,
        totalPrice:0,
        Price:null
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"orders")
        .then((response)=>{
            this.orders=response.data;
            this.departmentsWithoutFilter=response.data;
        });
        axios.get(variables.API_URL+"products")
        .then((response)=>{
            this.products=response.data;
            this.departmentsWithoutFilter=response.data;
        });
         axios.get(variables.API_URL+"list")
        .then((response)=>{
            this.lists=response.data;
            this.departmentsWithoutFilter=response.data;
        });
    },
    addClick(){
        this.mapProducts()
        this.modalTitle="Place order";
        this.OrderId=0;
        this.Customer="";
        this.NumberOfSweets="0",
        this.OrderStatus="",
        this.ListOfOrders=0,
        this.IDOfSweet = 0
    },
    editClick(dep){
        this.mapProducts()
        this.tempFields = dep;
        this.modalTitle="Edit Order";
        this.OrderId=dep.OrderId;
        this.Customer=dep.Customer;
        this.ProductPhotoLink=dep.ProductPhotoLink,
        this.NumberOfSweets=dep.NumberOfSweets,
        this.OrderStatus=dep.OrderStatus,
        this.ListOfOrders=dep.ListOfOrders,
        this.IDOfSweet = this.productsMap.get(dep.IDOfSweet)
        this.Price = dep.Price
    },
    createClick(){
        axios.post(variables.API_URL+"orders",{
            OrderId:null,
            Customer:this.Customer,
            NumberOfSweets:this.NumberOfSweets,
            OrderStatus: this.OrderStatus,
            ListOfOrders: this.ListOfOrders,
            IDOfSweet: this.IDOfSweet
        })
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });
    },
    updateClick(){
        this.tempFields.OrderId =this.OrderId,
        this.tempFields.Customer =this.Customer,
        this.tempFields.NumberOfSweets=this.NumberOfSweets,
        this.tempFields.OrderStatus=this.OrderStatus,
        this.tempFields.ListOfOrders= this.ListOfOrders,
        this.tempFields.IDOfSweet = this.IDOfSweet
        axios.put(variables.API_URL+"orders",this.tempFields
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
        axios.delete(variables.API_URL+"orders/"+id)
        .then((response)=>{
            this.refreshData();
            alert(response.data);
        });

    },
    FilterFn(){
        var DepartmentIdFilter=this.DepartmentIdFilter;
        var DepartmentNameFilter=this.DepartmentNameFilter;

        this.orders=this.departmentsWithoutFilter.filter(
            function(el){
                return el.OrderId.toString().toLowerCase().includes(
                    DepartmentIdFilter.toString().trim().toLowerCase()
                )&&
                el.Customer.toString().toLowerCase().includes(
                    DepartmentNameFilter.toString().trim().toLowerCase()
                )
            });
    },
    sortResult(prop,asc){
        this.orders=this.departmentsWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        })
    },
    mapProducts(){
    this.products.map(i=>{
        this.productsMap.set(i.ProductID, i.ProductName )
    })

    this.lists.map(i=>{
            this.listsMap.set(i.IdOfPiece, {productID: i.IDOfSweet,
                                           expires: i.DateOfExpiration})
    })

    for (let [key, value] of this.listsMap){
         for (let [i, j] of this.productsMap){
            if(i == value.productID){
            value.ProductName = j
            }
         }
        }
    }

},
 watch: {
        NumberOfSweets: function(val, oldVal) {
            if(this.IDOfSweet && this.OrderId!=null && !this.Price ){
            let price = this.products.filter(i=>i.ProductID==this.IDOfSweet)[0]
            this.totalPrice= parseFloat(parseInt(val)* parseFloat(price.ProductPrice)).toFixed(2)
            }else{
               this.totalPrice = 0;
            }
        }
 },
mounted:function(){
    this.refreshData();
}
}

