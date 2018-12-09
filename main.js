$(function () {

    var data = {
        lastId: 0,
        pizzas: []
    };

    var controller = {
        // Add Pizza
        addPizza: () => {
            var thisId = ++data.lastId;
            data.pizzas.push({
                id: thisId,
                visible: true
            });
            view.render();
        },
        // Remove Pizza
        removePizza: (pizza) => {
            var clickedPizza = data.pizzas[pizza.id - 1];
            clickedPizza.visible = false;
            view.render();
        },
        // Get all the visible Pizzas
        getVisiblePizzas: (input) => {
            var visiblePizzas = data.pizzas.filter((pizza) => {
                return (pizza.visible && ~pizza.id.toString().indexOf(input));
            });
            return visiblePizzas;
        },

        // Initialize
        init: () => {
            view.init();
        }
    };

    var view = {
        // Initialize
        init: () => {
            var addPizzaButton = $('.add-pizza');
            addPizzaButton.click(() => {
                controller.addPizza();
            });

            this.searchPizza = $('.search-pizza');
            searchPizza.on('keyup', (e) => {
                view.render();
            })
            // Grab element html
            this.$pizzaList = $('.pizza-list');
            this.pizzaTemplate = $('script[data-template="pizza"]').html();

            this.$pizzaList.on('click', '.remove-pizza', (e) => {
                var pizza = $(e.target).parents('.pizza').data();
                controller.removePizza(pizza);
                return false;
            });
            view.render();
        },
        render: () => {
            var $pizzaList = this.$pizzaList;
            pizzaTemplate = this.pizzaTemplate;
            var searchValue = this.searchPizza.val();

            $pizzaList.html('');

            controller.getVisiblePizzas(searchValue).forEach((pizza) => {

                var thisTemplate = pizzaTemplate.replace(/{{id}}/g, pizza.id);
                $pizzaList.append(thisTemplate);
            });
        }
    }
    controller.init();
}());
