const customer_balance=require("../model/customer_balance")
const invoice_master=require("../model/invoice_master")
const packing_sku_master=require("../model/packing_sku_master")
const axios = require('axios');
const distributor_master=require("../model/distributor_master")
const emp_customer_mapping=require("../model/emp_customer_mapping")
const employee_master=require("../model/employee_master")
const ledger_master=require("../model/ledger_master")
const getAgingByCustId=async(req,res)=>{
  try{
  const customer_id=req.query.id
  if(customer_id==null){
    res.send("please enter customer_id")
  }
  else{
  const get_data=await customer_balance.find({CUSTOMER_ID:customer_id})
  res.send(get_data)
  }
}
  catch(error){
    res.send("error in function getAgingByCustId ")
  }
}

const add_balance=async(req,res)=>{
  let data = JSON.stringify({
    "DT_FROM": "2018-02-06",
    "DT_TO": "2023-02-06"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.1.204:80/api/GetData/GetCustomerBalance?FROMDATE=2018-04-01&TODATE=2024-03-31',
    headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic VmVuZG9yUG9ydGFsOlZtVnVaRzl5'
    },
    data: data
};
const sendingdata =
    axios.request(config)
          .then((response) => {
                let data = response.data.Data
                // res.send(data)
                data.map(async (items, index) => {
//console.log(items)
                      const new_detail = await customer_balance.findOneAndUpdate({CUSTOMER_ID:items.CUSTOMER_ID},{$set:{items}})
                     // new_detail.save((respond, err) => {

                      })
               
                res.send("data inserted")
          })
          
          .catch((error) => {
                console.log(error);
          });

}

const graph_product2=async(req,res)=>{

  const CUSTOMER_ID=req.query.id
  const pipeline = [
    {
      $match: {
        CUSTOMER_ID: CUSTOMER_ID,
        INVOICE_DATE: {
          $gte: "2023-04-01",
          $lte: "2024-03-31",
        },
        DOCUMENT_TYPE: 'RV'
      }
    }
  ];
  
  const result = await invoice_master.aggregate(pipeline)


  result.map(async(item,index)=>{
    console.log(item.BILLING_CATEGORY)
    
    if(item.BILLING_CATEGORY=='M'||item.BILLING_CATEGORY=='P'){
           value=Number(item.PRICE)
          arr.push(value)
    }
    else if(item.BILLING_CATEGORY=='O'||item.BILLING_CATEGORY=='S'){
          value=(item.PRICE*-1)
          arr.push(value)
    }
    else if(item.BILLING_CATEGORY=='N'&& arr2.includes(item.ORDER_NO)){
          

           value=(item.PRICE*-1)
          arr.push(value)

    }
    else{
           value=0
          arr.push(value)

    }
})
  console.log(result);
  
}

const invoice_data=async(req,res)=>{
  let data = JSON.stringify({
    "DT_FROM": "2021-05-01",
    "DT_TO": "2021-05-10"
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://192.168.1.204/api/GetData/GetInvoice?FROMDATE=2021-05-01&TODATE=2021-05-10',
    headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic VmVuZG9yUG9ydGFsOlZtVnVaRzl5'
    },
    data: data
};
const sendingdata =
    axios.request(config)
          .then((response) => {
                      let data = response.data.Data
                      data.map(async (items, index) => {
                        const packing=await packing_sku_master.find({SKU_ID:items.SKU_ID})
                        if(packing.length!==0){
                        console.log(packing[0].SKU_ID)
                        const new_detail = await invoice_master.insertMany({...items,...{SKU_CATEGORY:packing[0].SKU_CATEGORY}})}
                      //const new_detail = await invoice_master.insertMany({items})
                    })
                      res.send("data inserted")
          }).catch((error) => {
                console.log(error);
          });

}

const currentVsLastSales=async(req,res)=>{
      const final=[]
     const customer_id=req.query.id
     const all_years=[]
     const current_year=new Date().getFullYear();
     const last_year=(current_year-1)
     const last2_year=(current_year-2)
     all_years.push(current_year,last_year,last2_year)
     for(i=0;i<all_years.length;i++){
      const start_date=new Date(all_years[i]+'-04-01')
      const end_date=new Date((all_years[i]+1)+'-03-31')
      console.log(start_date,end_date)
      const data= await invoice_master.aggregate([
        {$match: {
          INVOICE_DATE: {
              $gte:  start_date,
              $lte:  end_date}
            ,
          CUSTOMER_ID:customer_id}
        },
  
        {
          $group: {
            _id: {
              month: { $month: "$INVOICE_DATE" }
            },
            totalPrice: { $sum: '$PRICE' },
          totalDiscount1: { $sum: '$CASH_DISCOUNT' },
          totalDiscount2: { $sum: '$PRODUCT_DISCOUNT' }
          }
        },
        {
          $project: {
            _id: 0,
            month: "$_id.month",
            netPrice: {
              $subtract: [
                '$totalPrice',
                { $add: ['$totalDiscount1', '$totalDiscount2'] }
              ]
            }
          }
        }
      ])

      const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

      const arrangedData = monthNumbers.map((monthNumber) => {
        const dataItem = data.find(item => item.month === monthNumber);
        if (dataItem) {
          return {
            PRICE: (dataItem.netPrice / 1000).toFixed(7),
            MONTH: String(monthNumber)
          };
        } else {
          return {
            PRICE: '0.00',
            MONTH: String(monthNumber)
          };
        }
      });
      
      const totalSales = data.reduce((total, item) => total + item.netPrice, 0) / 1000;
      
      const finalResult = [...arrangedData, { TOTAL_SALES: totalSales.toFixed(15) }];
      
      //console.log(finalResult);
      // })
     // res.send(finalResult)
     final.push(finalResult)
    }

   res.send(final)

}



const graph_product=async(req,res)=>{
  const customer_id=req.query.id
  const final=[
  ]

  const all_sku=[]
  const current_year=new Date().getFullYear();
  
    const start_date=new Date('2021-04-01')
    const end_date=new Date('2022-03-31')
     const data= await invoice_master.aggregate([
      {$match: {
        SKU_CATEGORY:"SCP-REGULAR",
        INVOICE_DATE: {
            $gte:  start_date,
            $lte:  end_date}
          ,
        CUSTOMER_ID:customer_id}
      },

      {
        $group: {
          _id: {
            category: "$MATERIAL_GROUP",
            month: { $month: "$INVOICE_DATE" }
          },
          totalPrice: { $sum: '$PRICE' },
        totalDiscount1: { $sum: '$CASH_DISCOUNT' },
        totalDiscount2: { $sum: '$PRODUCT_DISCOUNT' }
        }
      },
      {
        $project: {
          _id: 0,
          category: "$_id.category",
          month: "$_id.month",
          netPrice: {
            $subtract: [
              '$totalPrice',
              { $add: ['$totalDiscount1', '$totalDiscount2'] }
            ]
          }
        }
      }
    ])
    data.map(async (data_output, index) => {
      let num = final.findIndex(items => items.category == data_output.category)
      if (num == -1) {
          final.push({
             "MAT":data_output.category
          })
      }
      else if (num != -1) {
        final.push({
          "MAT":data_output.category
       })
      }
      
    
  })

  const groupedData = data.reduce((result, item) => {
    const key = item.category;
    if (!result[key]) {
      result[key] = {
        category: item.category,
        months: []
      };
    }
    result[key].months.push({
      month: item.month,
      netPrice: item.netPrice
    });
    return result;
  }, {});
  
  const finalResult = Object.values(groupedData);
  
  console.log(finalResult);
    //  await invoice_master.find({SKU_CATEGORY:"SCP-REGULAR",CUSTOMER_ID:customer_id,INVOICE_DATE:{
    //   $gte: start_date,
    //   $lte: end_date
    // }})
    // console.log(data)
    // const groupedData = data.reduce((acc, obj) => {
    //   const { MATERIAL_GROUP } = obj;
    //   if (!acc[MATERIAL_GROUP]) {
    //     acc[MATERIAL_GROUP] = [];
    //   }
    //   acc[MATERIAL_GROUP].push({"GROUP_ID":obj.MATERIAL_GROUP});
    //   return acc;
    // }, {});
    //nconsole.log(groupedData);
    const monthsAbbreviation = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    const arrangedData = data.reduce((result, item) => {
      const { category, month, netPrice } = item;
      const existingCategory = result.find(entry => entry.MATERIAL_GROUP === category);
      
      if (existingCategory) {
        existingCategory[monthsAbbreviation[month - 1]] = netPrice.toFixed(7);
      } else {
        const newCategory = {
          MATERIAL_GROUP: category,
          MATERIAL_DESC: '', // Add the appropriate field value here
        };
        monthsAbbreviation.forEach((abbr, index) => {
          if (index + 1 === month) {
            newCategory[abbr] = netPrice.toFixed(7);
          } else {
            newCategory[abbr] = '0.00';
          }
        });
        result.push(newCategory);
      }
    
      return result;
    }, []);
    
    console.log(arrangedData);   
    res.send(arrangedData)

}



const salesBySkuCategory=async(req,res)=>{
  let final=[]
  const customer_id=req.query.id
  const sku_category=req.query.cat
  const all_years=[]
  const current_year=new Date().getFullYear();
  const last_year=(current_year-1)
  const last2_year=(current_year-2)
  all_years.push(current_year,last_year,last2_year)
  for(i=0;i<all_years.length;i++){
   const start_date=new Date(all_years[i]+'-04-01')
   const end_date=new Date((all_years[i]+1)+'-03-31')
  // console.log(start_date,end_date)
   const data= await invoice_master.aggregate([
    {$match: {
      SKU_CATEGORY:sku_category,
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          month: { $month: "$INVOICE_DATE" }
        },
        totalPrice: { $sum: '$PRICE' },
      totalDiscount1: { $sum: '$CASH_DISCOUNT' },
      totalDiscount2: { $sum: '$PRODUCT_DISCOUNT' }
      }
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        netPrice: {
          $subtract: [
            '$totalPrice',
            { $add: ['$totalDiscount1', '$totalDiscount2'] }
          ]
        }
      }
    }
  ])

  const monthNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const arrangedData = monthNumbers.map((monthNumber) => {
    const dataItem = data.find(item => item.month === monthNumber);
    if (dataItem) {
      return {
        PRICE: (dataItem.netPrice / 1000).toFixed(7),
        MONTH: String(monthNumber)
      };
    } else {
      return {
        PRICE: '0.00',
        MONTH: String(monthNumber)
      };
    }
  });
  
  const totalSales = data.reduce((total, item) => total + item.netPrice, 0) / 1000;
  
  const finalResult = [...arrangedData, { TOTAL_SALES: totalSales.toFixed(15) }];
  
  //console.log(finalResult);
  // })
 // res.send(finalResult)
 final.push(finalResult)
}

res.send(final)

}

const skuBySkuCategory=async(req,res)=>{
  const final=[]
  const customer_id=req.query.id
  const all_years=[]
  const current_year=new Date().getFullYear();
  const last_year=(current_year-1)
  const last2_year=(current_year-2)
  all_years.push(current_year,last_year,last2_year)
  //for(i=0;i<all_years.length;i++){
   const start_date=new Date('2021-04-01')
   const end_date=new Date('2022-03-31')
   console.log(start_date,end_date)
   const data= await invoice_master.aggregate([
     {$match: {
       INVOICE_DATE: {
           $gte:  start_date,
           $lte:  end_date}
         ,
       CUSTOMER_ID:customer_id}
     },

     {
       $group: {
         _id: {
           month: { $month: "$INVOICE_DATE" },
           category: "$MATERIAL_GROUP",

         },

         totalquantity: { $sum: '$BOX_QUANTITY' },
      
       }
     },
     {
       $project: {
         _id: 0,
         month: "$_id.month",
         category: "$_id.category",
         netquantity: "$totalquantity"
       }
     }
   ])
   const groupedData = data.reduce((acc, item) => {
    const month = item.month;
    acc[month] = acc[month] || [];
    acc[month].push(item);
    return acc;
}, {});

// Prepare the result in the desired format
const result = Object.entries(groupedData).map(([month, group]) => {
    const materialDesc = group.map(item => item.category);
    const quantitySum = group.map(item => item.netquantity.toFixed(4));
    return {
        "MATERIAL_DESC": materialDesc,
        "QUANTITY_SUM": quantitySum,
        "MONTH": month
    };
});

//console.log(result);
 //}

res.send(result)
}


const topmost_product=async(req,res)=>{
  const final=[]
  const customer_id=req.query.id
  const current_year=new Date().getFullYear();
  const start_date=new Date('2021-04-01')
  const end_date=new Date('2022-03-31')
  const data= await invoice_master.aggregate([
    {$match: {
      INVOICE_DATE: {
          $gte:  start_date,
          $lte:  end_date}
        ,
      CUSTOMER_ID:customer_id}
    },

    {
      $group: {
        _id: {
          category: "$SKU_CATEGORY",

        },

        totalquantity: { $sum: '$ORDER_QUANTITY' },
     
      }
    },
    {
      $project: {
        _id: 0,
      
        category: "$_id.category",
        netquantity: "$totalquantity"
      }
    }
  ])
  const groupedData = data.reduce((acc, item) => {
    const category = item.category;
    acc[category] = acc[category] || 0;
    acc[category] += item.netquantity;
    return acc;
}, {});

// Prepare the result in the desired format
const result = Object.entries(groupedData).map(([category, totalSku]) => {
    return {
        "SKU_CATEGORY": category,
        "TOTAL_SKU": totalSku.toFixed(7)
    };
});

// Sort the result in descending order by total SKU
result.sort((a, b) => b.TOTAL_SKU - a.TOTAL_SKU);

//console.log(result);


  res.send(result)
}
const getAllSkuCatgory=async(req,res)=>{
  const data=await packing_sku_master.distinct('SKU_CATEGORY')
  const arrangedList = data.map(category => ({ SKU_CATEGORY: category }));
res.send(arrangedList)
}

const getCustomerByCustId=async(req,res)=>{
  const distributor=req.query.id

  const distributor_data=await distributor_master.find({DISTRIBUTOR_ID:distributor})
  res.send(distributor_data)
}


const getCustomerDetailById=async(req,res)=>{
  const distributor=req.query.id
  const distributor_data=await distributor_master.find({DISTRIBUTOR_ID:distributor})
  
  const emp_customer_data=await emp_customer_mapping.find({CUSTOMER_ID:distributor_data[0].DISTRIBUTOR_ID})

  const emp_data=await employee_master.find({EMP_ID:emp_customer_data[0].EMP_ID})

  const data_final=[{
    DISTRIBUTOR_ID:distributor_data[0].DISTRIBUTOR_ID,
    DISTRIBUTOR_NAME:distributor_data[0].DISTRIBUTOR_NAME,
    DISTRIBUTOR_MOB_NO:distributor_data[0].DISTRIBUTOR_MOB_NO,
    DISTRIBUTOR_EMAIL_ID:distributor_data[0].DISTRIBUTOR_EMAIL_ID,
    DISTRIBUTOR_DISTRICT:distributor_data[0].DISTRIBUTOR_DISTRICT,
    REGION_ID:distributor_data[0].REGION_ID,
    EMP_ID:emp_customer_data[0].EMP_ID,
    EMP_NAME:emp_data[0].EMP_NAME
  }]
  res.send(data_final)
}

const getLedgerByCustId=async(req,res)=>{
  const distributor=req.query.id
  const ledger_data=await ledger_master.find({CUSTOMER_ID:distributor}).sort({TRANSACTION_TIME:-1})
  res.send(ledger_data)
}
module.exports={
  getAgingByCustId,getCustomerByCustId,getLedgerByCustId,getCustomerDetailById,add_balance,invoice_data,graph_product,currentVsLastSales,salesBySkuCategory,skuBySkuCategory,topmost_product,getAllSkuCatgory
}