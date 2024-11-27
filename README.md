# Anatomical Structures Explorer

## Project Overview
This Angular application fetches and displays anatomical structures from the Human Atlas API, allowing users to explore detailed information about specific structures.

## Key Features
- Retrieves unique anatomical structures from the Human Atlas API
- Displays structures in a grid layout
- Allows clicking on a structure to view detailed information
- Uses Angular Material for dialog and UI components
- Implements error handling and loading states

## Architecture

### State Management
- Utilized `@Injectable` services to handle data flow and UI state
- The `ApiService` serves as the primary injectable service for:
  - Managing data retrieval from external APIs
  - Transforming and processing raw API responses
  - Providing a centralized data access layer
- Implemented separation of concerns by moving data fetching logic outside of components
- Used RxJS observables to manage asynchronous data flows

### Components
1. **StructureListComponent**
   - Fetches and displays the list of unique anatomical structures
   - Handles loading and error states
   - Triggers the details dialog on structure selection

2. **StructureDetailsComponent**
   - Displays detailed information about a selected structure
   - Fetches additional details from the EBI Ontology Lookup Service
   - Provides a modal with structure information

### Services
- **ApiService**
  - Handles API calls to both the Human Atlas and EBI Ontology APIs
  - Processes and transforms raw API data
  - Implements error handling and data extraction
  - Annotated with `@Injectable` to enable dependency injection

## Key Implementation Details
- Used Angular 18 standalone components
- Implemented reactive programming with RxJS
- Utilized TypeScript interfaces for type safety
- Implemented error handling for API calls
- Created unique structure list by filtering duplicate names

## State Management Approach
```typescript
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Centralized service for data management
  fetchAnatomicalStructures(): Observable<Structure[]> {
    // Data retrieval and transformation logic
  }

  fetchStructureDetails(url: string): Observable<StructureDetails | null> {
    // Detailed data fetching logic
  }
}
```

## Running the Project
1. Clone the repository
2. Run `npm install`
3. Run `ng serve`
4. Navigate to `http://localhost:4200/`

## Challenges Addressed
- Handling varying API response formats
- Implementing unique structure extraction
- Creating a flexible and error-tolerant data fetching mechanism
- Providing a smooth user experience with loading and error states

## Technologies Used
- Angular 18
- RxJS
- Angular Material
- TypeScript
- HttpClient
- Dependency Injection

## Future Improvements
- Implement more advanced state management (e.g., NGXS)
- Add more robust error handling
- Implement caching mechanism
- Add pagination for large datasets
- Enhance UI/UX design

## Notes
Developed as part of an Angular Developer Test, focusing on clean architecture and functional requirements, with emphasis on using @Injectable services for managing data flow and application state.
