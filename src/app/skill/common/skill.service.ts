import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';

const skillUrl = `${environment.backend_url}/api/skills`;

@Injectable()
export class SkillService {

  constructor(private http: Http) {
  }

  getSkills(): Observable<any> {
    return this.http
      .get(skillUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getSkillsByProject(id: number): Observable<any> {
    const url = skillUrl + '/project?id=' + id;
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getSkillsForUser(id: number): Observable<any> {
    const url = skillUrl + '/user?id=' + id;
    return this.http.get(url)
      .map(res => res.json())
      .catch(this.handleError);
  }

  updateSkills(projectSkillsArray, id) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    params.set('skillsList', projectSkillsArray.join(','));
    const url = skillUrl + '/project/skills';
    return this.http
      .put(url, null, {search: params})
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
