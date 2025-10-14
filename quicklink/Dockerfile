# # Use an official OpenJDK 17 runtime as a parent image
# FROM eclipse-temurin:17-jdk-jammy

# # Set the working directory inside the container
# WORKDIR /app

# # Copy the built .jar file from your project's target folder into the container
# COPY target/*.jar app.jar

# # Make port 8080 available to the world outside this container
# EXPOSE 8080

# # The command to run when the container starts
# ENTRYPOINT ["java","-jar","app.jar"]



# --- Stage 1: The Builder ---
# Use a Maven image that includes JDK 17 to build the project
FROM maven:3.8.5-openjdk-17 AS builder

# Set the working directory
WORKDIR /app

# Copy the entire backend project source code into the builder
COPY . .

# Run the Maven build command to compile the code and create the .jar file
# -DskipTests skips running tests, which is standard for CI/CD builds
RUN mvn clean package -DskipTests


# --- Stage 2: The Runner ---
# Use a lightweight JRE image for the final container
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Copy ONLY the built .jar file from the 'builder' stage
COPY --from=builder /app/target/*.jar app.jar

# Expose the port the application runs on
EXPOSE 8080

# The command to run when the container starts
ENTRYPOINT ["java","-jar","app.jar"]