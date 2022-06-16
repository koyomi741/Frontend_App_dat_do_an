let defaultState = {
    selectedItems: { items: []},
  };
  
let cartReducer = ( state = defaultState, action ) => {
    let newState = {... state};
    console.log(newState)
    switch (action.type)
    {
        case 'ADD_TO_CART':{

            if(action.payload.checkboxValue) {
                // xóa các thành phần đã trung lắp
                newState.selectedItems = {
                  items: [
                    ...newState.selectedItems.items.filter(
                      (item) => item.title !== action.payload.title // loc ra tât cả cá iteam có giá trị khác 
                    ),
                  ],
                };
                // them mới vào giỏ hàng
                newState.selectedItems = {
                    items: [...newState.selectedItems.items, action.payload],
                };
                console.log("ADD TO CART");
            } else {
                
                newState.selectedItems = {
                  items: [
                    ...newState.selectedItems.items.filter(
                      (item) => item.title !== action.payload.title // loc ra tât cả cá iteam có giá trị khác 
                    ),
                  ],
                };
                console.log("REMOVE FROM CART");
            }
            // console.log(newState, "👉");
            return newState;
        }

        case 'REMOVE_FROM_CART': {
          
          newState.selectedItems = {
            items: [
              ...newState.selectedItems.items.filter(
                (item) => item.title !== action.payload.title,
              ),
            ],
          };
          console.log("REMOVE FROM CART");
          return newState;
        }

        case 'INCREASE_THE_NUMBER_OF_PRODUCTS': {
          
          for(let i=0; i < newState.selectedItems.items.length; i++){
            if( newState.selectedItems.items[i].title == action.payload.title )
                newState.selectedItems.items[i].quantity += 1;
          }
          newState.selectedItems = {
            items: [
              ...newState.selectedItems.items
            ],
          };
          console.log('INCREASE_THE_NUMBER_OF_PRODUCTS')
          return newState;
        }

        case 'REDUCE_THE_NUMBER_OF_PRODUCTS': {
          
          for(let i=0; i < newState.selectedItems.items.length; i++){
            if( newState.selectedItems.items[i].title == action.payload.title ){
                if(newState.selectedItems.items[i].quantity > 1)
                  newState.selectedItems.items[i].quantity -= 1;
                else alert('Số lượng sản phẩm phải lớn hơn 0')
            }
          }
          newState.selectedItems = {
            items: [
              ...newState.selectedItems.items
            ],
          };
          console.log('REDUCE_THE_NUMBER_OF_PRODUCTS')
          return newState;
        }   
        
        case 'RESET_DATA': {
          newState.selectedItems = {
            items: [
  
            ],
          };
          console.log('RESET_DATA')
          return newState;
        }
        default:
            return state;
    };
};

export default cartReducer;


// word
// selected : đã chọn