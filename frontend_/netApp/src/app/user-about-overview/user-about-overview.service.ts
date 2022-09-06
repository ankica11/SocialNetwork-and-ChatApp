import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAboutOverviewService {

   
  http_uri = "http://localhost:3000/api/user_about"
  https_uri = "https://localhost:4000/api/user_about"

  http_options = {headers: new HttpHeaders({'Content-Type': 'application/json'})}

  constructor(private http: HttpClient) { }


  uploadPhoto(){

  }

  postFile(username: string, fileToUpload: File) {
    
    const formData: FormData = new FormData();
    formData.append('image', fileToUpload, username + '_profile.jpg');
    formData.append('username', username)
    return this.http.post(`${this.http_uri}/upload`, formData)
      
}

  setQuotes(quotes, userId){

    let req = {
      userId: userId,
      favQuotes: quotes

    }

    return this.http.post(`${this.http_uri}/setFavQuotes`, req, this.http_options)


  }

  setNickname(nickname, userId){

    let req = {
      userId: userId,
      nickname: nickname

    }

    return this.http.post(`${this.http_uri}/setNickname`, req, this.http_options)


  }

  setAbout(about, userId){

    let req = {
      userId: userId,
      about: about

    }

    return this.http.post(`${this.http_uri}/setAbout`, req, this.http_options)


  }

  setBirthDate(birthDate, userId){
    let req = {
      userId: userId,
      birthDate: birthDate
    }

    return this.http.post(`${this.http_uri}/setBirthDate`, req, this.http_options)

  }

  setGender(gender, userId){
    let req = {
      userId: userId,
      gender: gender
    }

    return this.http.post(`${this.http_uri}/setGender`, req, this.http_options)

  }

  setInterestedIn(interestedIn, userId){
    let req = {
      userId: userId,
      interestedIn: interestedIn
    }

    return this.http.post(`${this.http_uri}/setInterestedIn`, req, this.http_options)

  }

  setSocialLinks(socialLinks, userId){

    let req = {
      userId: userId,
      socialLinks: socialLinks
    }

    return this.http.post(`${this.http_uri}/setSocialLinks`, req, this.http_options)

  }

  setWebsites(websites, userId){

    let req = {
      userId: userId,
      websites: websites
    }

    return this.http.post(`${this.http_uri}/setWebsites`, req, this.http_options)

  }
  setPhone(phone, userId){
    let req = {
      userId: userId,
      phone: phone
    }

    return this.http.post(`${this.http_uri}/setPhone`, req, this.http_options)

  }

  setEmail(email, userId){
    let req = {
      userId: userId,
      email: email
    }

    return this.http.post(`${this.http_uri}/setEmail`, req, this.http_options)

  }

  setLanguage(language, userId){
    let req = {
      userId: userId,
      language: language
    }

    return this.http.post(`${this.http_uri}/setLanguage`, req, this.http_options)

  }

  setWorkplace(workplace, userId){
    let req = {
      userId: userId,
      workplace: workplace
    }

    return this.http.post(`${this.http_uri}/setWorkplace`, req, this.http_options)

  }

  setCollege(college, userId){
    let req = {
      userId: userId,
      college: college
    }

    return this.http.post(`${this.http_uri}/setCollege`, req, this.http_options)

  }

  setCurrentPlace(currentPlace, userId){
    let req = {
      userId: userId,
      currentPlace: currentPlace
    }

    return this.http.post(`${this.http_uri}/setCurrentPlace`, req, this.http_options)

  }

  setHometown(hometown, userId){
    let req = {
      userId: userId,
      hometown: hometown
    }

    return this.http.post(`${this.http_uri}/setHometown`, req, this.http_options)

  }

  setRelationshipStatus(relationshipStatus, userId){
    let req = {
      userId: userId,
      relationshipStatus: relationshipStatus
    }

    return this.http.post(`${this.http_uri}/setRelationshipStatus`, req, this.http_options)

  }

  setHighschool(highschool, userId){

    let req = {
      userId: userId,
      highschool: highschool
    }

    return this.http.post(`${this.http_uri}/setHighschool`, req, this.http_options)


  }
}
