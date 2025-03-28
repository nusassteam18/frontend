<script setup>
import 'bootstrap/dist/css/bootstrap.css';
import restaurantService from '@/services/restaurantService';
import { reactive, onMounted } from 'vue';

const state = reactive({
    restaurant: {
        name: '',
        description: '',
        address: '',
        image: '',
    },
    isLoading: true,
});

const fetchRestaurant = async () => {
  state.isLoading = true;

  try {
    state.restaurant = await restaurantService.getRestaurant();
  } catch (error) {
    console.error("Error fetching restaurant!", error);
  } finally {
    state.isLoading = false;
  }
};

onMounted(fetchRestaurant);
</script>

<template>
    <div class="container default-prop">
        <div class="shadow rounded py-3 px-5">

            <h1 class="mb-5 text-center">My Restaurant</h1>
            
            <form>
                <div class="mb-3">
                    <div class="row">
                        <div class="col-sm-6">
                            <label for="name" class="form-label fw-semibold">Name</label>
                            <input type="text" class="form-control" id="name" :value="state.restaurant.name">
                        </div>

                        <div class="col-sm-6">
                            <label for="contact" class="form-label fw-semibold">Contact</label>
                            <input type="text" class="form-control" id="contact" :value="state.restaurant.contact">
                            </div>
                    </div>

                </div>
                <div class="mb-3">
                    <label for="address" class="form-label fw-semibold">Address</label>
                    <input type="text" class="form-control" id="address" :value="state.restaurant.address">
                </div>

                <div class="mb-3">
                    <label for="description" class="form-label fw-semibold">Description</label>
                    <input type="text" class="form-control" id="description" :value="state.restaurant.description">
                </div>

                <div class="mb-3">
                    <label for="image" class="form-label fw-semibold">Image</label>
                    <input class="form-control" type="file" id="image">
                    <img v-if="state.restaurant.image" src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5" class="img-thumbnail img-200 mt-2" alt="...">
                </div>

                <div class="text-end">
                    <button type="submit" class="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.default-prop {
    text-align: initial;
    color: #212529 !important;
}

.img-200 {
    width: 200px;
    max-width: 200px;
}
</style>