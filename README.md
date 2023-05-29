# GYM_API

GYM_API is a GymPass-style app developed as a project for learning purposes, with a focus on implementing solid software development principles. The app includes various features and serves as a demonstration of these principles in practice.

## Requirements

For detailed information on the project requirements, please refer to the [requirements document](https://github.com/gutkedu/gym_api/edit/master/docs/requisitos.md) located in the `docs` folder.

## Setup

To set up the project, follow the steps below:

1. Configure the environment variables by creating a `.env` file based on the provided `.env.example` file.

2. Start the Docker containers by running the following command:
   ```shell
   docker compose up -d
   ```

3. Apply the database migrations using Prisma by executing the following command:
   ```shell
   npx prisma migrate dev
   ```

4. Run the project using the command:
   ```shell
   npm run start:dev
   ```

## Tests

To run the tests, use the following commands:

- Run unit tests:
  ```shell
  npm run test
  ```

- Run end-to-end tests:
  ```shell
  npm run test:e2e
  ```

## References

For additional learning resources and inspiration, you can visit the [Rocketseat](https://www.rocketseat.com.br/) website.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
