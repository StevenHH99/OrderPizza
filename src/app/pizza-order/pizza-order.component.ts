import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-order.component.html',
  styleUrl: './pizza-order.component.scss'
})

export class PizzaOrderComponent implements OnInit  {
  totalPrice_small=0;
  totalPrice_medium=0;
  totalPrice_large=0;  
  totalPrice_extralarge =0;
  totalQty_small =0;
  totalQty_medium =0;
  totalQty_large =0;
  totalQty_extralarge =0;
  offer1: any;
  offer2: any;
  offer3: any;
  lgdiscount: any;
  mddiscount: any;
  smdiscount: any;
  showDiscounted: any;
  
  pizzaSizes: any = {
    small:{rate: 5.00},
    medium:{rate: 7.00},
    large:{rate: 8.00},
    extralarge: {rate: 9.00}
  }; 
  
  toppings: any = {
    veg: [
      {
        name: 'Tomatoes',
        rate: 1.00
      },
      {
        name: 'Onions',
        rate: 0.50
      },
      {
        name: 'Bell pepper',
        rate: 1.00
      },
      {
        name: 'Mushrooms',
        rate: 1.20
      },
      {
        name: 'Pineapple',
        rate: 0.75
      }
    ],
    nonveg: [
      {
        name: 'Sausage',
        rate: 1.00
      },
      {
        name: 'Pepperoni',
        rate: 2.00
      },
      {
        name: 'Barbecue chicken',
        rate: 3.00
      }
    ],

  }

  order: any = {
    small: {topping:[]},
    medium: {topping:[]},
    large: {topping:[]},
    extralarge:{topping:[]}
  };

  ngOnInit() {
  }

  GetQuantity_small(){
    var orderqty_small = (<HTMLInputElement>document.getElementsByName("small")[0]).value;
    this.totalQty_small = parseInt(orderqty_small);
  }

  GetQuantity_medium()
  {
    var orderqty_medium = (<HTMLInputElement>document.getElementsByName("medium")[0]).value;
    this.totalQty_medium = parseInt(orderqty_medium);
  }

  GetQuantity_large()
  {
    var orderqty_large = (<HTMLInputElement>document.getElementsByName("large")[0]).value;
    this.totalQty_large = parseInt(orderqty_large);
  }

  GetQuantity_extralarge()
  {
    var orderqty_extralarge = (<HTMLInputElement>document.getElementsByName("extralarge")[0]).value;
    this.totalQty_extralarge = parseInt(orderqty_extralarge);
  }

  chooseToppingItem(e:any, obj:any) {
    let target = e.currentTarget,
      id = target.getAttribute('id'),
      value = target.value,
      checked = target.checked,
      size = target.getAttribute('data-size');   
    let item = {
      id: id,
      name: obj.name,
      rate: value,
      checked: checked,
      size: size
    }

    if (item.checked) {     
        if(!this.order[size].toppings)
        {
          this.order[size].toppings =[];
        }
        this.order[size].toppings.push(item)        
    } else {
      let index =0;
      let checkItem = this.order[size].toppings.find((element:any, j: number) => {
        if (element.id === item.id) {
          index = j;
          return element;
        }
      });
      this.order[size].forEach((k:number) => {
        this.order[size].toppings.splice(index, 1)
      })
    }
    console.log(this.order.medium)
    this.checkPromotions();
    //var quantity =
    this.totalPrice_small =this.getPrice(this.order['small'].toppings,'small');
    this.totalPrice_medium =this.getPrice(this.order['medium'].toppings,'medium');
    this.totalPrice_large =this.getPrice(this.order['large'].toppings,'large');
    this.totalPrice_extralarge =this.getPrice(this.order['extralarge'].toppings,'extralarge');
  }

  checkPromotions() {
    // OFFER 1
    if (this.order.small.length >= 1) {
      this.order.small.forEach((el: { toppings: any; }) => {
        if ('toppings' in el) {
          let toppings = el.toppings;
          if (toppings.length == 2) {
            this.offer1 = "Offer 1 - Applied";
          } else { this.offer1 = null; }
        }
      })
    } else { this.offer1 = null; }

    // OFFER 2
    if (this.order.medium.length == 2) {
      this.order.medium.forEach((deal: { toppings: any; }) => {
        if ('toppings' in deal) {
          let toppings = deal.toppings;
          if (toppings.length == 4) {
            this.offer2 = "Offer 2 - Applied";
          } else { this.offer2 = null; }
        }
      })
    } else { this.offer2 = null; }

    // OFFER 3
    if (this.order.large.length >= 1) {
      let pep = false, bbq = false, matched = [];
      this.order.large.forEach((deal: { toppings: any; }) => {
        if ('toppings' in deal) {
          let toppings = deal.toppings;
          toppings.forEach((topping: { name: string; }) => {
            if (topping.name.toLowerCase() === 'pepperoni') pep = true;
            if (topping.name.toLowerCase() === 'barbecue chicken') bbq = true;
          })
        }
      })
      if (pep && bbq) { this.offer3 = "Offer 3 - Applied"; }
      else { this.offer3 = null; }

    } else { this.offer3 = null; }

  }

  getPrice(orderArr: any[], size: string): number {
    let sumPrice = 0;
    let qty = 0;    
    let rate:any | undefined;  
    
    

    if (orderArr && orderArr.length > 0) {
      switch (size) {
        case 'small':
          sumPrice += this.pizzaSizes.small.rate;
          qty = this.totalQty_small;
          break;
        case 'medium':
          sumPrice += this.pizzaSizes.medium.rate;
          qty = this.totalQty_medium;
          break; 
        case 'large':
          sumPrice += this.pizzaSizes.large.rate;
          qty = this.totalQty_large;
          break;
        case 'extralarge':
          sumPrice += this.pizzaSizes.extralarge.rate;
          qty = this.totalQty_extralarge;
          break;
        default:
          sumPrice += 0.00;
      }
      orderArr.forEach((topping) => {
        /* qty++;
        if ('rate' in element) {
          rate = parseFloat(element['rate']);
        } */
        //let toppings = 'toppings' in element ? element.toppings : []; */
        //let toppings: any;
        let pep;
        let pepRate:any|undefined;
        let bbq;
        let bbqRate;
        let sumOfPairDeal;
        //if (toppings.length > 0) {
        //  toppings.forEach((topping: { name: string; rate: string; }) => {
            if (size == 'large') {
              if (topping.name.toLowerCase() === 'pepperoni') {
                pepRate = parseFloat(topping.rate);
                pep = true;
              }
              if (topping.name.toLowerCase() === 'barbecue chicken') {
                bbqRate = parseFloat(topping.rate);
                bbq = true;
              }
              sumPrice += parseFloat(topping.rate);
            } else {
              sumPrice += parseFloat(topping.rate);
            }
        //  })
          if (size == 'large') {
            sumOfPairDeal = pepRate + bbqRate;
            if (pep && bbq) {
              this.lgdiscount = (sumPrice - (sumOfPairDeal)) + (sumOfPairDeal / 2); // CALCULATION FOR 50% DISCOUNT IN CASE OF BOTH PEPPERONI AND BBQ CHICKEN
            }
          }
       // }
      });
      sumPrice = (sumPrice * qty); // DEDUCT DEFAULT SIZE RATE FROM NO.OF QUANTITY AS IT HAS ALREADY BEEN ADDED ONCE IN SWITCH CASE ABOVE
      
    }
    return sumPrice;
  }

 /*  orderQuantity(size:number,currentVal:number, type:string) {
    if (type == 'plus') {
      var cloneDeal = JSON.parse(JSON.stringify(this.order[size]));
      if (cloneDeal.length > 0) {
        this.order[size].push(cloneDeal[0]);
      } else { // NO TOPPING ADDED BY DEFAULT
        this.order[size].push({
          rate: this.pizzaSizes[size].rate,
          toppings: []
        });
      }
    } else {
      this.order[size].splice(0, 1);
      if (this.order[size].length == 0) {
        let els = document.getElementsByClassName(size + '-checkbox');
        console.log('els', els)
        Array.prototype.forEach.call(els, function (el, i) {
          el.checked = false;
        });
      }
    }  
  } */
}
