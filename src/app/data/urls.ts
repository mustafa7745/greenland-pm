export class Urls {
  private baseUrl = 'https://greenland-rest.com/v1/project_manager/api/';
  loginUrl = this.baseUrl + 'login.php';
  publicKeyUrl = this.baseUrl + 'get_public_key.php';
  refreshLoginToken = this.baseUrl + 'refresh_token.php';
  ordersUrl = this.baseUrl  + 'orders/';
  deliveryMenUrl = this.baseUrl  + 'delivery_men/';
  collectionsUrl = this.baseUrl  + 'collections/';
  notificationsUrl = this.baseUrl  + 'notifications/';



  productsUrl = this.baseUrl  + 'products/';
  offersUrl = this.baseUrl  + 'offers/';

  reservationUrl = this.baseUrl  + 'reservations/';
  acceptaceUrl = this.baseUrl  + 'acceptance/';
  usersUrl = this.baseUrl  + 'users/';
  usersLocationsUrl = this.baseUrl  + 'users_locations/';




  productsGroupsUrl = this.baseUrl  + 'products_groups/';
  productsImagesUrl = this.baseUrl  + 'products_images/';

  localServer = 'http://localhost/store/';
  catUrl = this.localServer + 'categories/';
}
